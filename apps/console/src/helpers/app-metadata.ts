import {LogLevel, rootLogger} from '@/services/logger/root-logger';

class AppMeta {
  #logger = rootLogger.getChildLogger('AppMeta');

  constructor(
    readonly version: string,
    readonly build: string,
    readonly commit: string,
  ) {
    this.#logger.debug(this.string);
  }
  get string() {
    return `v${this.version}+${this.build}-${this.commit}`;
  }
}

declare global {
  interface Window {
    __COSMO__: {
      /** Set the log level to LogLevel.DEBUG */
      debug: () => void;
      /** Data about the currently deployed application */
      app: AppMeta;
    };
  }
}

export const appMetadata = new AppMeta(
  import.meta.env.APP_VERSION,
  import.meta.env.APP_BRANCH,
  import.meta.env.APP_COMMIT,
);

export function initAppMeta() {
  if (typeof window !== 'undefined') {
    window.__COSMO__ = window.__COSMO__ || {};
    window.__COSMO__.app = appMetadata;

    window.__COSMO__.debug = () => {
      console.log('App Metadata:', appMetadata);
      rootLogger.setLogLevel(LogLevel.DEBUG);
      rootLogger.debug('Debug Test Message');
      rootLogger.log(
        'Debug logging enabled.\n\nIf you cannot see the debug message above, you may need to change your browser console log level to reveal debug messages.',
      );
    };
  }
}
