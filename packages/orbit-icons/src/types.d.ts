/* eslint-disable import-x/no-default-export -- external declaration */

// @rsbuild/plugin-svgr
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.svg?react' {
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

/* eslint-enable import-x/no-default-export -- external declaration */
