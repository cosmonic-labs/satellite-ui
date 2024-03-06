import {render, screen} from '@testing-library/react';
import {describe, expect} from 'vitest';
import Toolbar from './toolbar.js';

describe('Toolbar', () => {
  it('should display', () => {
    render(<Toolbar>Child Text</Toolbar>);

    expect(screen.getByTestId('toolbar')).toMatchSnapshot();
  });
});
