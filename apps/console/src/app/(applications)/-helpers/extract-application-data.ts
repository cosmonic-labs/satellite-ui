import {type ApplicationManifest} from '@wasmcloud/lattice-client-core';
import {load} from 'js-yaml';

export type ApplicationData = {
  name?: string;
  version?: string;
  description?: string;
  components?: string[];
  providers?: string[];
  links?: string[];
};

function extractApplicationData(yaml?: string): ApplicationData {
  if (!yaml) throw new Error('No yaml provided');
  // TODO: shouldn't us assertion here, instead check all the properties or use a type guard
  const data = load(yaml) as ApplicationManifest;

  return {
    name: data?.metadata?.name ?? '',
    version: data?.metadata?.annotations?.version ?? '',
    description: data?.metadata?.annotations?.description ?? '',
    components: (data?.spec?.components ?? [])
      .filter((component) => component.type === 'component')
      .map((actor) => actor.name),
    providers: (data?.spec?.components ?? [])
      .filter((component) => component.type === 'capability')
      .map((capability) => capability.name),
    links: (data?.spec?.components ?? [])
      .filter((component) => component?.traits?.some((trait) => trait.type === 'link'))
      .map((component) => {
        const linkTrait = component?.traits?.find((trait) => trait.type === 'link');
        if (!linkTrait) return '';
        if (!('target' in linkTrait.properties)) return '';
        return `${component.name}:${linkTrait.properties.target}`;
      }),
  };
}

export {extractApplicationData};
