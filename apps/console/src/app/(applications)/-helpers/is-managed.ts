import {type WasmCloudLink, type ApplicationManifest} from '@wasmcloud/lattice-client-core';

function isManagedComponent(
  component: {annotations?: Record<string, string>},
  manifest: ApplicationManifest,
): boolean {
  return Object.entries(component.annotations ?? {}).some(
    ([key, value]) => key === 'wasmcloud.dev/appspec' && value === manifest.metadata.name,
  );
}

function isManagedProvider(
  provider: {annotations?: Record<string, string>},
  manifest: ApplicationManifest,
): boolean {
  return Object.entries(provider.annotations ?? {}).some(
    ([key, value]) => key === 'wasmcloud.dev/appspec' && value === manifest.metadata.name,
  );
}

const NOT_ASCII_ALPHANUMERIC = /[^A-Za-z0-9]/;
function isManagedLink(link: WasmCloudLink, manifest: ApplicationManifest): boolean {
  for (const component of manifest.spec.components ?? []) {
    const applicationName = manifest.metadata.name.replace(NOT_ASCII_ALPHANUMERIC, '_');
    const componentName = component.name.replace(NOT_ASCII_ALPHANUMERIC, '_');
    const linkId = `${applicationName}-${componentName}`;
    if (linkId === link.source_id || linkId === link.target) {
      return true;
    }
  }

  return false;
}

export {isManagedComponent, isManagedProvider, isManagedLink};
