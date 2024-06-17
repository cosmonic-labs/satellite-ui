import {type ApplicationSummary, type WasmCloudLink} from '@wasmcloud/lattice-client-core';

function getManagedAppNameFromLink(link: WasmCloudLink, applications: ApplicationSummary[]) {
  return (
    applications.find((app) => {
      const regexp = new RegExp(`^${app.name.replaceAll('-', '_')}-.+`);
      return regexp.test(link.source_id) || regexp.test(link.target);
    })?.name ?? undefined
  );
}

export {getManagedAppNameFromLink};
