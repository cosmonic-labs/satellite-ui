/* eslint-disable import/no-default-export, @typescript-eslint/naming-convention -- This is a type extension */
declare module '*.svg?react' {
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
/* eslint-enable import/no-default-export, @typescript-eslint/naming-convention -- This is a type extension */
