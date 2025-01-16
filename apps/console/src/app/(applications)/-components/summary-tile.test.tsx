import {screen} from '@testing-library/react';
import {renderApp} from '@/test';
import {SummaryTile} from './summary-tile';
import {describe, expect, it} from 'vitest';

describe('<SummaryTile />', () => {
  it('should render with data', () => {
    const view = renderApp(<SummaryTile title="Bottles of beer on the wall" count={99} />);

    screen.getByText('Bottles of beer on the wall');
    screen.getByText('99');

    expect(view.container).toMatchSnapshot();
  });
});
