import {
  type ApplicationDetail,
  type WasmCloudComponent,
  type WasmCloudHost,
  type WasmCloudProvider,
} from '@wasmcloud/lattice-client-core';
import {isManagedComponent, isManagedProvider} from './is-managed';

function getApplicationInventory(hosts: WasmCloudHost[], application: ApplicationDetail) {
  const inventory = hosts.reduce(
    (
      data: {
        components: Map<string, WasmCloudComponent>;
        providers: Map<string, WasmCloudProvider>;
        utilizedHosts: Map<string, WasmCloudHost>;
      },
      host,
    ) => {
      for (const component of host.components) {
        if (isManagedComponent(component, application.manifest)) {
          const existingComponent = data.components.get(component.id);
          data.components.set(component.id, {
            ...existingComponent,
            id: component.id,
            name: component.name,
            revision: component.revision ?? 0,
            image_ref: component.image_ref ?? '',
            max_instances: component.max_instances ?? 0,
            annotations: component.annotations ?? {},
            instances: [...(existingComponent?.instances ?? []), host.host_id],
          });
          data.utilizedHosts.set(host.host_id, host);
        }
      }

      for (const provider of host.providers) {
        if (isManagedProvider(provider, application.manifest)) {
          const existingProvider = data.providers.get(provider.id);
          data.providers.set(provider.id, {
            ...existingProvider,
            id: provider.id,
            name: provider.name,
            image_ref: provider.image_ref ?? '',
            annotations: provider.annotations ?? {},
            hosts: [...(existingProvider?.hosts ?? []), host.host_id],
          });
          data.utilizedHosts.set(host.host_id, host);
        }
      }

      return data;
    },
    {components: new Map(), providers: new Map(), utilizedHosts: new Map()},
  );

  return inventory;
}

export {getApplicationInventory};
