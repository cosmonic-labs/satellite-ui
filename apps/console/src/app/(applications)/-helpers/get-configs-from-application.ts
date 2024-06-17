import {type ApplicationManifest, type WasmCloudConfig} from '@wasmcloud/lattice-client-core';

function getConfigsFromManifest(app: ApplicationManifest): WasmCloudConfig[] {
  const configs: WasmCloudConfig[] = [];
  for (const component of app.spec.components) {
    if (!component.properties.config) continue;

    for (const config of component.properties.config) {
      configs.push({
        name: `${app.metadata.name}-${config.name}`,
        entries: config.properties,
      });
    }
  }

  return configs;
}

export {getConfigsFromManifest};
