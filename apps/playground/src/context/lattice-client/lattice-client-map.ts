import {LatticeClient, type LatticeClientOptions} from '@wasmcloud/lattice-client-core';

class LatticeClientMap {
  readonly #clients: Map<string, LatticeClient>;
  #selectedClient: string;

  static #instance: LatticeClientMap;

  // eslint-disable-next-line no-restricted-syntax -- private constructor for singleton
  private constructor() {
    this.#clients = new Map();
    this.#selectedClient = 'default';

    // TODO: load clients from local storage

    if (this.#clients.size === 0) {
      this.addClient('default', new LatticeClient({config: {latticeUrl: 'ws://127.0.0.1:4223'}}));
    }
  }

  addClient(key: string, client: LatticeClient): void {
    if (this.#clients.has(key)) {
      throw new Error(`Client already exists at index ${key}`);
    }

    this.#clients.set(key, client);
  }

  removeClient(key: string): void {
    if (this.#clients.has(key)) {
      this.#clients
        .get(key)
        ?.instance.disconnect()
        .catch((error: Error) => {
          console.log(`Error disconnecting client ${key}: ${error.message}`);
        });
      this.#clients.delete(key);
    }
  }

  getClient(key?: string): LatticeClient {
    const selectedKey = key ?? this.#selectedClient;
    const client = this.#clients.get(selectedKey);
    if (!client) {
      throw new Error(`Client doesn't exist at index ${key}`);
    }

    return client;
  }

  setClient(key: string): void {
    if (!this.#clients.has(key)) {
      throw new Error(`Client doesn't exist at index ${key}`);
    }

    this.#selectedClient = key;
  }

  get clients(): Map<string, LatticeClient> {
    return this.#clients;
  }

  configureClient(key: string, config: Partial<LatticeClientOptions['config']>): void {
    const client = this.#clients.get(key);
    if (!client) {
      throw new Error(`Client doesn't exist at index ${key}`);
    }

    client.instance.setPartialConfig(config);
  }

  static create(): LatticeClientMap {
    this.#instance ||= new LatticeClientMap();

    return this.#instance;
  }
}

const latticeClients = LatticeClientMap.create();

export {latticeClients, type LatticeClientMap};
