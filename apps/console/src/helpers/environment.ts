export enum EnvironmentEnum {
  Test = 'Test',
  Production = 'Production',
  Staging = 'Staging',
  Local = 'Local',
}

function determineCurrentEnvironment(): EnvironmentEnum {
  if (import.meta.env.NODE_ENV === 'test') {
    return EnvironmentEnum.Test;
  }

  if (import.meta.env.DEV) {
    return EnvironmentEnum.Local;
  }

  if (import.meta.env.PROD) {
    return getEnvironmentFromHostname() === 'Staging'
      ? EnvironmentEnum.Staging
      : EnvironmentEnum.Production;
  }

  return EnvironmentEnum.Local;
}

const currentEnvironment: EnvironmentEnum = determineCurrentEnvironment();

export function isInEnvironment(isItThisEnvironment: EnvironmentEnum): boolean {
  return currentEnvironment === isItThisEnvironment;
}

export function getEnvironmentFromHostname(): 'Production' | 'Staging' | 'Local' {
  switch (window?.location?.hostname) {
    case 'preview.cloud.cosmonic.com': {
      return 'Staging';
    }

    case 'cloud.cosmonic.com': {
      return 'Production';
    }

    default: {
      return 'Local';
    }
  }
}
