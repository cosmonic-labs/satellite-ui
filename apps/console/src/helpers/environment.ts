export enum EnvironmentEnum {
  Test = 'Test',
  Production = 'Production',
  Staging = 'Staging',
  Local = 'Local',
}

function determineCurrentEnvironment(): EnvironmentEnum {
  if (process.env.NODE_ENV === 'test') {
    return EnvironmentEnum.Test;
  }

  if (process.env.NODE_ENV === 'development') {
    return EnvironmentEnum.Local;
  }

  if (process.env.NODE_ENV === 'production') {
    return getEnvironmentFromHostname() === 'Staging'
      ? EnvironmentEnum.Staging
      : EnvironmentEnum.Production;
  }

  return EnvironmentEnum.Local;
}

export const currentEnvironment: EnvironmentEnum = determineCurrentEnvironment();

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
