import {act, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useState} from 'react';
import {describe, expect} from 'vitest';
import ToolbarOptionToggle from './toolbar-option-toggle.js';

describe('ToolbarOptionToggle', () => {
  it('should display correctly', () => {
    const view = render(
      <ToolbarOptionToggle label="Enable Entropy" id="entropy-id" name="entropy-name" />,
    );

    expect(view.baseElement).toMatchSnapshot();
  });

  it('should toggle a value', async () => {
    const user = userEvent.setup();

    const TestComponent = (): JSX.Element => {
      const [value, onChange] = useState(false);
      return (
        <div>
          <div data-test-id="chaos-state">{value ? '🐵' : '🙈'}</div>
          <ToolbarOptionToggle
            label="Chaos"
            data-test-id="chaos-toggle"
            value={value}
            onChange={onChange}
          />
        </div>
      );
    };

    render(<TestComponent />);

    expect(screen.getByTestId('chaos-state')).toHaveTextContent('🙈');

    await act(async () => await user.click(screen.getByTestId('chaos-toggle')));

    expect(screen.getByTestId('chaos-state')).toHaveTextContent('🐵');
  });

  it('should do nothing if no onChange prop is passed', async () => {
    const TestComponent = (): JSX.Element => {
      const value = true;
      return (
        <div>
          <div data-test-id="chaos-state">{value ? '🐵' : '🙈'}</div>
          <ToolbarOptionToggle label="Chaos" data-test-id="chaos-toggle" value={value} />
        </div>
      );
    };

    render(<TestComponent />);

    expect(screen.getByTestId('chaos-state')).toHaveTextContent('🐵');

    await act(async () => await userEvent.click(screen.getByTestId('chaos-toggle')));

    expect(screen.getByTestId('chaos-state')).toHaveTextContent('🐵');
  });
});
