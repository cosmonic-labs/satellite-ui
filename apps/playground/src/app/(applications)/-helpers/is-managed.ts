import {type WasmCloudLink, type ApplicationManifest} from '@cosmonic/lattice-client-core';

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

function isManagedLink(link: WasmCloudLink, manifest: ApplicationManifest): boolean {
  for (const component of manifest.spec.components ?? []) {
    const linkId = `${manifest.metadata.name}-${component.name}`;
    if (linkId === link.source_id || linkId === link.target) {
      return true;
    }
  }

  return false;
}

export {isManagedComponent, isManagedProvider, isManagedLink};
