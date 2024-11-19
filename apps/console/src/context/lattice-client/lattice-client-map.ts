import {
  LatticeClient,
  NatsWsLatticeConnection,
  type LatticeClientOptions,
} from '@wasmcloud/lattice-client-core';
import {CSAT_LATTICE_CLIENT_SELECTED, CSAT_LATTICE_CLIENTS} from '@/helpers/local-storage-keys';
import {latticeLogger, selectorLogger} from './logger';

type LatticeClientConfig = LatticeClientOptions['config'];
type LatticeClientEntry = {name: string; client: LatticeClient};

type LatticeClientMap = {
  readonly addEntry: (
    name: string,
    clientOrConfig: LatticeClient | LatticeClientConfig,
  ) => LatticeClientEntry;
  readonly getEntry: (key?: string) => LatticeClientEntry;
  readonly updateEntry: (
    key: string,
    entry: {
      name?: string;
      config?: LatticeClientConfig;
    },
  ) => void;
  readonly removeEntry: (key: string) => void;
  readonly getClient: (key?: string) => LatticeClient;
  readonly selectLattice: (key: string) => void;
  readonly isConnected: () => Promise<boolean>;
  readonly subscribe: (subscriber: () => void) => () => void;
  readonly getSnapshot: () => string;
  readonly selectedKey: () => string;
  readonly clients: Map<string, LatticeClientEntry>;
};

function createLatticeClientMap(): LatticeClientMap {
  let isReady = false;
  const clients = new Map<string, LatticeClientEntry>();
  const subscribers = new Set<() => void>();
  const DEFAULT_KEY = 'localhost';
  let selectedKey: string | undefined;

  // init
  selectorLogger.debug('Initializing LatticeClientMap');

  selectedKey = localStorage.getItem(CSAT_LATTICE_CLIENT_SELECTED) ?? DEFAULT_KEY;

  restore();

  if (clients.size === 0) {
    addEntry(DEFAULT_KEY, {latticeUrl: 'ws://127.0.0.1:4223'});
  }

  isReady = true;
  selectorLogger.debug('LatticeClientMap initialized', clients);

  // functions //

  function subscribe(subscriber: () => void) {
    subscribers.add(subscriber);
    return () => {
      subscribers.delete(subscriber);
    };
  }

  function getConfigs(): Array<[string, {name: string; config: LatticeClientConfig}]> {
    return [...clients.entries()]
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .map(([key, entry]) => [
        key,
        {
          name: entry.name,
          config: {
            latticeUrl: entry.client.instance.config.latticeUrl,
            ctlTopicPrefix: entry.client.instance.config.ctlTopicPrefix,
            latticeId: entry.client.instance.config.latticeId,
            retryCount: entry.client.instance.config.retryCount,
            wadmTopicPrefix: entry.client.instance.config.wadmTopicPrefix,
          },
        },
      ]);
  }

  function notify(): void {
    selectorLogger.debug('Notifying subscribers');
    for (const subscriber of subscribers) {
      subscriber();
    }
  }

  function getNewConnection(config: LatticeClientConfig) {
    return new NatsWsLatticeConnection({latticeUrl: config.latticeUrl});
  }

  function addEntry(
    name: string,
    clientOrConfig: LatticeClient | LatticeClientConfig,
    key?: string,
  ): LatticeClientEntry {
    selectorLogger.debug('Adding LatticeClientEntry', {key, name, clientOrConfig});

    const entryKey =
      key ??
      name
        ?.toLowerCase()
        .replaceAll(/\s/g, '-')
        .replaceAll(/[^\da-z-]/g, '');

    const client =
      clientOrConfig instanceof LatticeClient
        ? clientOrConfig
        : new LatticeClient({
            config: clientOrConfig,
            getNewConnection,
          });

    selectorLogger.debug('Added LatticeClientEntry', {entryKey, name, client});

    const newEntry = {name: name ?? key, client};
    clients.set(entryKey, newEntry);

    store();

    return newEntry;
  }

  function removeEntry(key: string): void {
    if (clients.size === 1) {
      throw new Error('Cannot remove last client');
    }

    if (key === selectedKey) {
      const newKey = [...clients.keys()].find((newKey) => newKey !== key);
      selectedKey = newKey;
    }

    if (clients.has(key)) {
      clients
        .get(key)
        ?.client.instance.disconnect()
        .catch((error: Error) => {
          console.log(`Error disconnecting client ${key}: ${error.message}`);
        });
      clients.delete(key);
    }

    store();
  }

  function getEntry(key?: string): LatticeClientEntry {
    const clientKey = key ?? selectedKey ?? DEFAULT_KEY;
    const client = clients.get(clientKey);
    if (!client) {
      throw new Error(`Client doesn't exist at index ${key}`);
    }

    return client;
  }

  function selectLattice(key: string): void {
    if (!clients.has(key)) {
      throw new Error(`Client doesn't exist at index ${key}`);
    }

    selectedKey = key;

    store();
  }

  function updateEntry(
    key: string,
    entry: {
      name?: string;
      config?: LatticeClientConfig;
    },
  ): void {
    const existingEntry = getEntry(key);

    if (entry.config) existingEntry.client.instance.setPartialConfig(entry.config);
    if (entry.name) existingEntry.name = entry.name;

    store();
  }

  const isConnected = async (): Promise<boolean> => {
    const entry = getEntry();

    if (!entry) {
      throw new Error('Client is not configured');
    }

    await entry.client.instance.connect();

    if (entry.client.connection.status !== 'connected') {
      throw new Error('Client connection failed');
    }

    return true;
  };

  function store(): void {
    if (!isReady) return;

    const clients = getConfigs();

    const clientsJson = JSON.stringify(Object.fromEntries(clients));

    localStorage.setItem(CSAT_LATTICE_CLIENTS, clientsJson);
    localStorage.setItem(CSAT_LATTICE_CLIENT_SELECTED, selectedKey ?? DEFAULT_KEY);

    selectorLogger.debug('Stored clients', clientsJson);

    notify();
  }

  function restore(): void {
    const clientConfigs = localStorage.getItem(CSAT_LATTICE_CLIENTS) ?? '';
    if (clientConfigs) {
      const parsedClients = isValidClientsList(JSON.parse(clientConfigs));
      for (const [key, configOrEntryValue] of Object.entries(parsedClients)) {
        if (isLatticeClientConfig(configOrEntryValue)) {
          addEntry(key, new LatticeClient({config: configOrEntryValue, getNewConnection}));
        } else if (isLatticeEntryConfig(configOrEntryValue)) {
          addEntry(configOrEntryValue.name, configOrEntryValue.config, key);
        } else {
          selectorLogger.warn('Skipping invalid client config', key, configOrEntryValue);
        }
      }
    }

    selectedKey = localStorage.getItem(CSAT_LATTICE_CLIENT_SELECTED) ?? DEFAULT_KEY;
  }

  return {
    addEntry,
    getClient: (key?: string) => getEntry(key).client,
    removeEntry,
    getEntry,
    selectLattice,
    updateEntry,
    isConnected,
    subscribe,
    getSnapshot: () => JSON.stringify([selectedKey, getConfigs()]),
    selectedKey: () => selectedKey ?? DEFAULT_KEY,
    clients,
  };
}

function isValidClientsList(
  clients: unknown,
): Record<string, LatticeClientConfig | {name: string; config: LatticeClientConfig}> {
  if (typeof clients !== 'object' || clients === null) {
    throw new Error('Invalid clients list');
  }

  return clients as Record<
    string,
    LatticeClientConfig | {name: string; config: LatticeClientConfig}
  >;
}

function isLatticeClientConfig(data: unknown): data is LatticeClientConfig {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  return 'latticeUrl' in data;
}

function isLatticeEntryConfig(data: unknown): data is {name: string; config: LatticeClientConfig} {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  return 'name' in data && 'config' in data;
}

const latticeClients = createLatticeClientMap();

export {latticeClients, type LatticeClientMap, type LatticeClientEntry, type LatticeClientConfig};
