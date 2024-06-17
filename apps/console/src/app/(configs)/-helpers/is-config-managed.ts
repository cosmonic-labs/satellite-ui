import {type ApplicationSummary, type ApplicationManifest} from '@wasmcloud/lattice-client-core';
import {getConfigsFromManifest} from '@/app/(applications)/-helpers/get-configs-from-application';

function isConfigManaged(configName: string, applications: ApplicationManifest[]): boolean {
  return applications.some((app) =>
    getConfigsFromManifest(app).some((config) => config.name === configName),
  );
}

function getManagedAppName(configName: string, applications: ApplicationSummary[]) {
  return (
    applications.find((app) => new RegExp(`^${app.name.replaceAll('-', '_')}-.+`).test(configName))
      ?.name ?? undefined
  );
}

export {isConfigManaged, getManagedAppName};
