import {isInEnvironment, EnvironmentEnum} from '@/helpers/environment';

enum LogLevel {
  DEBUG = 0,
  LOG = 1,
  WARN = 2,
  ERROR = 3,
}

type LoggerOptions = {
  level?: LogLevel;
};

type AllowedMethods = 'debug' | 'log' | 'warn' | 'error';

function shouldLog(method: AllowedMethods, level: LogLevel) {
  const methodLevel = LogLevel[method.toUpperCase() as keyof typeof LogLevel];
  return methodLevel >= level;
}

class Logger {
  readonly #childLoggers: Map<string, Logger> = new Map<string, Logger>();
  readonly #name: string | undefined;
  readonly #options: Required<LoggerOptions>;
  readonly #initialOptions: Required<LoggerOptions>;

  get #prefix() {
    return this.#name ? ` [${this.#name}]` : '';
  }

  constructor(name?: string, options?: LoggerOptions) {
    let level = LogLevel.LOG;

    if (isInEnvironment(EnvironmentEnum.Local)) {
      level = LogLevel.DEBUG;
    } else if (isInEnvironment(EnvironmentEnum.Production)) {
      level = LogLevel.ERROR;
    }

    this.#options = {
      level,
      ...options,
    };
    this.#name = name;
    this.#initialOptions = {...this.#options};
  }

  getChildLogger(childName: string, options: LoggerOptions = {}): Logger {
    const newName = this.#name ? `${this.#name}:${childName}` : childName;
    if (this.#childLoggers.has(childName)) {
      return this.#childLoggers.get(newName)!;
    }

    this.#childLoggers.set(newName, new Logger(newName, {...this.#options, ...options}));

    return this.#childLoggers.get(newName)!;
  }

  setLogLevel(level: LogLevel) {
    this.#options.level = level;
    for (const [, childLogger] of this.#childLoggers) {
      childLogger.setLogLevel(level);
    }
  }

  resetLogLevel() {
    this.#options.level = this.#initialOptions?.level ?? LogLevel.LOG;
    for (const [, childLogger] of this.#childLoggers) {
      childLogger.resetLogLevel();
    }
  }

  // binding to console methods to preserve the context (i.e. source line number)
  get debug() {
    if (!shouldLog('debug', this.#options.level)) {
      return () => null;
    }

    return console.debug.bind(console, `🐛${this.#prefix}`);
  }

  get log() {
    if (!shouldLog('log', this.#options.level)) {
      return () => null;
    }

    return console.log.bind(console, `💾${this.#prefix}`);
  }

  get warn() {
    if (!shouldLog('warn', this.#options.level)) {
      return () => null;
    }

    return console.warn.bind(console, `🚧${this.#prefix}`);
  }

  get error() {
    if (!shouldLog('error', this.#options.level)) {
      return () => null;
    }

    return console.error.bind(console, `🚨${this.#prefix}`);
  }
}

const rootLogger = new Logger();

export {rootLogger, LogLevel};
