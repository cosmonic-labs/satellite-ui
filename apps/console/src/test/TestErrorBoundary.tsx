import {Component, ErrorInfo, PropsWithChildren} from 'react';

export class TestErrorBoundary extends Component<PropsWithChildren> {
  public state: {
    error: Error | null;
    errorInfo: ErrorInfo | null;
  } = {
    error: null,
    errorInfo: null,
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  public render(): JSX.Element {
    if (this.state.errorInfo) {
      return (
        <div data-test-id="error">
          <div data-test-id="error-type">{this.state.error?.toString()}</div>
          <div data-test-id="error-stack">{this.state.errorInfo.componentStack}</div>
        </div>
      );
    } else {
      return <div data-test-id="error">{this.props.children}</div>;
    }
  }
}
