import {consoleDebugEnabled} from '@/helpers/environment';

enum LogLevel {
  LOG = 0,
  WARN = 1,
  ERROR = 2,
}

const ALLOWED_METHODS = ['log', 'warn', 'error'] as const;

function isProxiedMethod(method: string | symbol): method is (typeof ALLOWED_METHODS)[number] {
  if (typeof method === 'symbol') return false;

  return (ALLOWED_METHODS as readonly string[]).includes(method);
}

function shouldLog(level: LogLevel, consoleDebugEnabled: boolean) {
  return consoleDebugEnabled ? level >= LogLevel.LOG : level >= LogLevel.ERROR;
}

function createLogger(name?: string, options?: {level: LogLevel}) {
  const level = options?.level ?? LogLevel.LOG;

  const prefix = name ? `[${name}]` : undefined;

  const logger = new Proxy(console, {
    get(target, propertyKey, receiver) {
      if (isProxiedMethod(propertyKey)) {
        return function (...input: unknown[]) {
          if (shouldLog(level, consoleDebugEnabled)) {
            const logPrefix = prefix ? `${prefix}:` : '';
            if (logPrefix) input.unshift(logPrefix);
            console[propertyKey](...input);
          }
        };
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- Proxy trap
      return Reflect.get(target, propertyKey, receiver);
    },
  });

  function getChildLogger(childName: string) {
    return createLogger(name ? `${name}:${childName}` : childName, {level});
  }

  return {
    getChildLogger,
    log: logger.log,
    warn: logger.warn,
    error: logger.error,
  };
}

const rootLogger = createLogger();

export {rootLogger, LogLevel};
