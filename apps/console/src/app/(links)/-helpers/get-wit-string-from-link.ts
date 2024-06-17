import {type WasmCloudLink} from '@wasmcloud/lattice-client-core';

function getWitStringFromLink(
  link: Pick<WasmCloudLink, 'interfaces' | 'wit_namespace' | 'wit_package'>,
): string {
  return `${link.wit_namespace}/${link.wit_package}:${link.interfaces.join(',')}`;
}

export {getWitStringFromLink};
