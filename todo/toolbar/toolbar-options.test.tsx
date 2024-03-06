import {act, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect} from 'vitest';
import ToolbarOptions from './toolbar-options.js';

describe('ToolbarOptions', () => {
  it('should display button', () => {
    render(<ToolbarOptions />);

    expect(screen.getByTestId('toolbar-options-button')).toMatchSnapshot();
    expect(screen.queryByTestId('toolbar-options')).not.toBeInTheDocument();
  });

  it('should display options on click', async () => {
    const user = userEvent.setup();
    render(
      <ToolbarOptions>
        <div data-test-id="child">child option element</div>
      </ToolbarOptions>,
    );

    // Show
    await act(async () => await user.click(screen.getByTestId('toolbar-options-button')));
    expect(screen.getByTestId('toolbar-options')).toMatchSnapshot();

    // Hide
    await act(async () => await user.click(screen.getByTestId('toolbar-options-button')));
    expect(screen.queryByTestId('toolbar-options')).not.toBeInTheDocument();
  });

  it('should hide on click outside', async () => {
    const user = userEvent.setup();
    render(
      <>
        <ToolbarOptions>
          <div data-test-id="child">child option element</div>
        </ToolbarOptions>
        <button data-test-id="outside-button">Outside</button>
      </>,
    );

    // Show
    await act(async () => await user.click(screen.getByTestId('toolbar-options-button')));
    expect(screen.getByTestId('toolbar-options')).toMatchSnapshot();

    // Hide
    await act(async () => await user.click(screen.getByTestId('outside-button')));
    expect(screen.queryByTestId('toolbar-options')).not.toBeInTheDocument();
  });
});
