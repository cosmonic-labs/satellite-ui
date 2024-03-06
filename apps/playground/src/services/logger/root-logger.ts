import {consoleDebugEnabled} from '@/helpers/environment';

enum LogLevel {
  LOG = 0,
  WARN = 1,
  ERROR = 2,
}

function shouldLog(level: LogLevel) {
  return consoleDebugEnabled ? level >= LogLevel.LOG : level >= LogLevel.ERROR;
}

class Logger {
  #level: LogLevel;
  readonly #name?: string;
  readonly #loggers = new Map<string, Logger>();

  constructor(name?: string, options?: {level: LogLevel}) {
    this.#name = name;
    this.#level = options?.level ?? LogLevel.LOG;
  }

  setLevel(level: LogLevel) {
    this.#level = level;
  }

  getChildLogger(name: string) {
    let logger = this.#loggers.get(name);

    if (!logger) {
      logger = new Logger(`${this.#name}:${name}`, {level: this.#level});
      this.#loggers.set(name, logger);
    }

    return logger;
  }

  log(...arguments_: unknown[]) {
    if (shouldLog(this.#level)) {
      if (this.#name) arguments_.unshift(`[${this.#name}]:`);
      console.log(...arguments_);
    }
  }

  warn(...arguments_: unknown[]) {
    if (shouldLog(this.#level)) {
      if (this.#name) arguments_.unshift(`[${this.#name}]:`);
      console.warn(...arguments_);
    }
  }

  error(...arguments_: unknown[]) {
    if (shouldLog(this.#level)) {
      if (this.#name) arguments_.unshift(`[${this.#name}]:`);
      console.error(...arguments_);
    }
  }
}

const rootLogger = new Logger();

export {rootLogger, LogLevel};
