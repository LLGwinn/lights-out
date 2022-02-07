import React from 'react';
import { render } from '@testing-library/react';
import Cell from './Cell';

// SMOKE TEST
it('renders without crashing', () => {
    render(<Cell />);
})

