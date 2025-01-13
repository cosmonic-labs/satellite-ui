declare module '*.svg?react' {
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  // eslint-disable-next-line import-x/no-default-export -- required for external type declaration
  export default ReactComponent;
}
