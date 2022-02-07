import React from 'react';
import { render } from '@testing-library/react';
import Board from './Board';


// SMOKE TEST
it('renders without crashing', () => {
    render(<Board />);
})

// SNAPSHOT TEST
it('matches snapshot', () => {
    const {asFragment} = render(<Board ncols={3} nrows={3} chanceLightStartsOn={100} />);
        expect(asFragment).toMatchSnapshot();
})

// OTHER TESTS
it('shows winner message if all lights are off', () => {
    const { getByText } = render(<Board ncols={3} nrows={3} chanceLightStartsOn={0} />);
    const message = getByText("YOU WIN!");
    expect(message).toBeInTheDocument();
})