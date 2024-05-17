export enum EnvironmentEnum {
  Test = 'Test',
  Production = 'Production',
  Development = 'Dev',
  Local = 'local',
}

function determineCurrentEnvironment(): EnvironmentEnum {
  if (import.meta.env.NODE_ENV === 'test') {
    return EnvironmentEnum.Test;
  }

  if (import.meta.env.PROD) {
    return getEnvironmentFromHostname() === 'Dev'
      ? EnvironmentEnum.Development
      : EnvironmentEnum.Production;
  }

  return EnvironmentEnum.Local;
}

const currentEnvironment: EnvironmentEnum = determineCurrentEnvironment();

export function isInEnvironment(isItThisEnvironment: EnvironmentEnum): boolean {
  return currentEnvironment === isItThisEnvironment;
}

export const shouldConsoleLog = isInEnvironment(EnvironmentEnum.Development);

export function getEnvironmentFromHostname(): 'Dev' | 'Production' | 'local' {
  switch (window?.location?.hostname) {
    case 'dev-app.cosmonic.com': {
      return 'Dev';
    }

    case 'app.cosmonic.com': {
      return 'Production';
    }

    default: {
      return 'local';
    }
  }
}
