import {act, render, screen} from '@testing-library/react';
import {describe, expect} from 'vitest';
import ToolbarButton from './toolbar-button.js';

describe('ToolbarButton', () => {
  it('should display', () => {
    render(<ToolbarButton name="Embiggen" data-test-id="embiggen-button" />);

    expect(screen.getByTestId('embiggen-button')).toMatchSnapshot();
  });

  it('should glow', () => {
    render(<ToolbarButton name="Shiny" data-test-id="shiny-button" glow />);

    expect(screen.getByTestId('shiny-button')).toMatchSnapshot();
  });

  it('should accept jsx in icon prop', () => {
    render(
      <ToolbarButton
        name="Icon"
        data-test-id="icon-button"
        icon={<span>Definitely an Icon</span>}
      />,
    );

    expect(screen.getByText('Definitely an Icon')).toBeInTheDocument();
    expect(screen.getByTestId('icon-button')).toMatchSnapshot();
  });

  it('should handle clicks', () => {
    const testCallback = vi.fn();
    render(<ToolbarButton name="Click Me" data-test-id="clicky-button" onClick={testCallback} />);

    act(() => {
      screen.getByTestId('clicky-button').click();
    });

    expect(testCallback).toHaveBeenCalled();
  });
});
