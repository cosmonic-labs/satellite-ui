import {type ApplicationManifest} from '@wasmcloud/lattice-client-core';
import {load} from 'js-yaml';
import {
  ApplicationTrait,
  ApplicationTraitLink,
} from 'node_modules/@wasmcloud/lattice-client-core/dist/types';

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
  // TODO: shouldn't use `as` assertion here, instead check all the properties or use a type guard
  const data = load(yaml) as ApplicationManifest;

  const components = ((): string[] =>
    (data?.spec?.components ?? [])
      .filter((component) => component.type === 'component')
      .map((actor) => actor.name))();

  const providers = ((): string[] =>
    (data?.spec?.components ?? [])
      .filter((component) => component.type === 'capability')
      .map((capability) => capability.name))();

  const links = ((): string[] =>
    data?.spec?.components?.flatMap(
      (component) =>
        component?.traits
          ?.filter(traitIsLink)
          .map((trait) => `${component.name}:${trait.properties.target}`) ?? [],
    ) ?? [])();

  return {
    name: data?.metadata?.name ?? '',
    version: data?.metadata?.annotations?.version ?? '',
    description: data?.metadata?.annotations?.description ?? '',
    components,
    providers,
    links,
  };
}

function traitIsLink(trait: ApplicationTrait): trait is ApplicationTraitLink {
  return trait.type === 'link' && 'target' in trait.properties;
}

export {extractApplicationData};
