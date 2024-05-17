import {LatticeClient, type LatticeClientOptions} from '@wasmcloud/lattice-client-core';
import {PG_LATTICE_CLIENT_SELECTED, PG_LATTICE_CLIENTS} from '@/helpers/local-storage';

type LatticeClientConfig = LatticeClientOptions['config'];

class LatticeClientMap {
  readonly #clients: Map<string, LatticeClient>;
  #selectedKey: string | undefined;
  static #instance: LatticeClientMap;
  readonly #subscribers = new Set<() => void>();
  readonly #defaultKey = 'localhost' as const;

  // eslint-disable-next-line no-restricted-syntax -- private constructor for singleton
  private constructor() {
    this.#clients = new Map();
    this.#selectedKey = localStorage.getItem(PG_LATTICE_CLIENT_SELECTED) ?? this.#defaultKey;

    this.#restore();

    if (this.#clients.size === 0) {
      this.addClient(
        this.#defaultKey,
        new LatticeClient({config: {latticeUrl: 'ws://127.0.0.1:4223'}}),
      );
    }
  }

  subscribe = (subscriber: () => void) => {
    this.#subscribers.add(subscriber);
    return () => {
      this.#subscribers.delete(subscriber);
    };
  };

  getSnapshot = (): this => this;

  readonly #notify = (): void => {
    for (const subscriber of this.#subscribers) {
      subscriber();
    }
  };

  addClient = (key: string, clientOrConfig: LatticeClient | LatticeClientConfig): void => {
    if (this.#clients.has(key)) {
      throw new Error(`Client already exists at index ${key}`);
    }

    if (clientOrConfig instanceof LatticeClient) {
      this.#clients.set(key, clientOrConfig);
    } else {
      this.#clients.set(key, new LatticeClient({config: clientOrConfig}));
    }

    this.#store();
  };

  removeClient = (key: string): void => {
    if (this.#clients.size === 1) {
      throw new Error('Cannot remove last client');
    }

    if (key === this.#selectedKey) {
      const newKey = [...this.#clients.keys()].find((newKey) => newKey !== key);
      this.#selectedKey = newKey;
    }

    if (this.#clients.has(key)) {
      this.#clients
        .get(key)
        ?.instance.disconnect()
        .catch((error: Error) => {
          console.log(`Error disconnecting client ${key}: ${error.message}`);
        });
      this.#clients.delete(key);
    }

    this.#store();
  };

  getClient = (key?: string): LatticeClient => {
    const selectedKey = key ?? this.#selectedKey ?? this.#defaultKey;
    const client = this.#clients.get(selectedKey);
    if (!client) {
      throw new Error(`Client doesn't exist at index ${key}`);
    }

    return client;
  };

  setClient = (key: string): void => {
    if (!this.#clients.has(key)) {
      throw new Error(`Client doesn't exist at index ${key}`);
    }

    this.#selectedKey = key;

    this.#store();
  };

  get selectedKey(): string | undefined {
    return this.#selectedKey;
  }

  get clients(): Map<string, LatticeClient> {
    return this.#clients;
  }

  configureClient = (key: string, config: Partial<LatticeClientOptions['config']>): void => {
    const client = this.#clients.get(key);
    if (!client) {
      throw new Error(`Client doesn't exist at index ${key}`);
    }

    client.instance.setPartialConfig(config);

    this.#store();
  };

  isConnected = async (): Promise<boolean> => {
    const client = this.getClient();

    if (!client) {
      throw new Error('Client is not configured');
    }

    await client.instance.connect();

    if (client.connection.status !== 'connected') {
      throw new Error('Client connection failed');
    }

    return true;
  };

  readonly #store = (): void => {
    const clients = [...this.#clients.entries()].map(([key, client]) => [
      key,
      {
        latticeUrl: client.instance.config.latticeUrl,
        ctlTopicPrefix: client.instance.config.ctlTopicPrefix,
        latticeId: client.instance.config.latticeId,
        retryCount: client.instance.config.retryCount,
        wadmTopicPrefix: client.instance.config.wadmTopicPrefix,
      } satisfies LatticeClientOptions['config'],
    ]) as Array<[string, LatticeClientOptions['config']]>;

    const clientsJson = JSON.stringify(Object.fromEntries(clients));

    localStorage.setItem(PG_LATTICE_CLIENTS, clientsJson);
    localStorage.setItem(PG_LATTICE_CLIENT_SELECTED, this.#selectedKey ?? this.#defaultKey);

    this.#notify();
  };

  readonly #restore = (): void => {
    const clientConfigs = localStorage.getItem(PG_LATTICE_CLIENTS) ?? '';
    if (clientConfigs) {
      const parsedClients = isValidClientsList(JSON.parse(clientConfigs));
      for (const [key, clientConfig] of Object.entries(parsedClients)) {
        this.addClient(key, new LatticeClient({config: clientConfig}));
      }
    }

    this.#selectedKey = localStorage.getItem(PG_LATTICE_CLIENT_SELECTED) ?? this.#defaultKey;
  };

  static create(): LatticeClientMap {
    this.#instance ||= new LatticeClientMap();

    return this.#instance;
  }
}

function isValidClientsList(clients: unknown): Record<string, LatticeClientOptions['config']> {
  if (typeof clients !== 'object' || clients === null) {
    throw new Error('Invalid clients list');
  }

  return clients as Record<string, LatticeClientOptions['config']>;
}

const latticeClients = LatticeClientMap.create();

export {latticeClients, type LatticeClientMap};
