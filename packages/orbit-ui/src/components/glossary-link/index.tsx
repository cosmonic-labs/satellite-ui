import {ExternalLinkIcon} from 'lucide-react';
import * as React from 'react';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/tooltip/index.jsx';

/** Make object type with only exact keys from type argument */
type Exact<T extends Record<string, unknown>> = {[K in keyof T]: T[K]};

type GlossaryTerm = {
  term: string;
  link: string;
  description: string | React.ReactElement;
};

type GlossaryLinkProperties = {
  /** Use existing glossary term or provide your own */
  readonly term: GlossaryTermKey | GlossaryTerm;
};

const GLOSSARY = {
  'Application': {
    link: 'https://wasmcloud.com/docs/fundamentals/wadm/model',
    description: 'An imperative deployment of managed components, providers, links and configs.',
  },
  'Host': {
    link: `https://wasmcloud.com/docs/concepts/hosts`,
    description: 'A wasmCloud runtime process that runs Components and Providers.',
  },
  'Actor': {
    link: `https://wasmcloud.com/docs/0.82/concepts/actors`,
    description: 'A Wasm module that can be deployed to a Host. Now referred to as a "Component".',
  },
  'Component': {
    link: 'https://wasmcloud.com/docs/concepts/components',
    description: 'A Wasm module that can be deployed to a Host.',
  },
  'Capability': {
    link: `https://wasmcloud.com/docs/concepts/interfaces`,
    description: 'An interface contract implemented by Providers and consumed by Components.',
  },
  'Provider': {
    link: `https://wasmcloud.com/docs/concepts/capabilities`,
    description: 'A service that provides a capability to Components.',
  },
  'Link Definition': {
    link: `https://wasmcloud.com/docs/concepts/runtime-linking`,
    description: 'A declarative connection between an Component and a Provider.',
  },
  'Link Name': {
    link: `https://wasmcloud.com/docs/concepts/runtime-linking`,
    description:
      'A unique name to allow for different link configurations to the same capability provider',
  },
  'Constellation': {
    link: `https://wasmcloud.com/docs/concepts/lattice`,
    description:
      'A Cosmonic-managed wasmCloud lattice; a cluster of Hosts among which Components and Providers communicate.',
  },
  'Leaf Node': {
    link: `https://wasmcloud.com/docs/deployment/nats/leaf-nodes`,
    description: 'A NATS Leaf Node server that is connected to your constellation.',
  },
  'OCI Reference': {
    link: `https://wasmcloud.com/docs/deployment/oci/`,
    description: (
      <>
        OCI references are URLs that point to an artifact. For example:{' '}
        <code>wasmcloud.azurecr.io/actor:v1.0.0</code>.
      </>
    ),
  },
  'wadm': {
    link: 'https://github.com/wasmCloud/wadm',
    description:
      'The wasmCloud Component Deployment Manager (WADM) enables deploying declarative models for applications.',
  },
} as const satisfies Record<string, Omit<GlossaryTerm, 'term'>>;

type GlossaryTermKey = keyof typeof GLOSSARY;

function GlossaryLink({
  term: termKey,
  children,
}: React.PropsWithChildren<GlossaryLinkProperties>): JSX.Element {
  const terms: Record<string, Exact<Omit<GlossaryTerm, 'term'>>> = GLOSSARY;
  const {term, link, description} =
    typeof termKey === 'string' ? {...terms[termKey], term: termKey} : termKey;

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <span className="underline decoration-dotted" role="term">
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-sm text-sm">
        <h4 className="font-semibold" role="term">
          {term}
        </h4>
        <p role="definition">{description}</p>
        <a
          rel="help noreferrer external"
          href={link}
          target="_blank"
          className="mt-1 text-xs text-muted-foreground underline"
        >
          <ExternalLinkIcon className="inline-block size-3" /> Read More
        </a>
      </TooltipContent>
    </Tooltip>
  );
}

export {GlossaryLink};
