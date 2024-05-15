import {debug} from 'node:console';
import {shouldConsoleLog} from '@/helpers/environment';

enum LogLevel {
  DEBUG = 0,
  LOG = 1,
  WARN = 2,
  ERROR = 3,
}

const ALLOWED_METHODS = ['debug', 'log', 'warn', 'error'] as const;
type AllowedMethods = (typeof ALLOWED_METHODS)[number];

function isProxiedMethod(method: string | symbol): method is AllowedMethods {
  if (typeof method === 'symbol') return false;

  return (ALLOWED_METHODS as readonly string[]).includes(method);
}

function shouldLog(method: AllowedMethods, level: LogLevel) {
  const methodLevel = LogLevel[method.toUpperCase() as keyof typeof LogLevel];
  return methodLevel >= level;
}

type Logger = ReturnType<typeof createLogger>;

function createLogger(name?: string, options?: {level: LogLevel}) {
  const loggerOptions = {
    level: shouldConsoleLog ? LogLevel.LOG : LogLevel.WARN,
    ...options,
  };

  const childLoggers = new Map<string, ReturnType<typeof createLogger>>();

  const prefix = name ? `[${name}]` : undefined;

  const logger = new Proxy(console, {
    get(target, propertyKey, receiver) {
      if (isProxiedMethod(propertyKey)) {
        return function (firstMessage: unknown, ...rest: unknown[]) {
          if (shouldLog(propertyKey, loggerOptions.level)) {
            const shouldGroup = rest && rest.length > 0;
            const intro = [];
            const body = [];

            if (propertyKey === 'error') intro.push('🚨');
            if (propertyKey === 'warn') intro.push('🚧');
            if (propertyKey === 'log') intro.push('💾');
            if (propertyKey === 'debug') intro.push('🐛');

            if (prefix) intro.push(prefix);
            if (shouldGroup) {
              intro.push(firstMessage);
              body.push(firstMessage, ...rest);
            } else {
              body.push(...intro, firstMessage, ...rest);
            }

            if (shouldGroup) console.groupCollapsed(...intro);
            console[propertyKey](...body);
            if (shouldGroup) console.groupEnd();
          }
        };
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- Proxy trap
      return Reflect.get(target, propertyKey, receiver);
    },
  });

  logger.debug('Logger created', {level: loggerOptions.level});

  function getChildLogger(childName: string): Logger {
    const newName = name ? `${name}:${childName}` : childName;
    if (childLoggers.has(childName)) return childLoggers.get(newName)!;

    childLoggers.set(newName, createLogger(newName, loggerOptions));

    return childLoggers.get(newName)!;
  }

  function setLogLevel(level: LogLevel) {
    loggerOptions.level = level;
    for (const [, childLogger] of childLoggers) childLogger.setLogLevel(level);
  }

  function resetLogLevel() {
    loggerOptions.level = options?.level ?? LogLevel.LOG;
    for (const [, childLogger] of childLoggers) childLogger.resetLogLevel();
  }

  return {
    getChildLogger,
    setLogLevel,
    resetLogLevel,
    debug: logger.debug,
    log: logger.log,
    warn: logger.warn,
    error: logger.error,
  };
}

const rootLogger = createLogger();

if (shouldConsoleLog) {
  rootLogger.setLogLevel(LogLevel.LOG);
} else {
  rootLogger.setLogLevel(LogLevel.ERROR);
}

export {rootLogger, LogLevel};
