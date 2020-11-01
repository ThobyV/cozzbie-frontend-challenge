import React from 'react';
import { render } from '@testing-library/react';
import { App, ShapesOptions, DisplaySVG } from './App';

describe('ShapesOptions', () => {
  it('renders svg shapes options', async () => {
    const _shapes = ['circle','square','polygon','ellipse']

    const { getAllByRole } = render(<ShapesOptions items={_shapes} />)

    const listItems = getAllByRole('option')
    expect(listItems).toHaveLength(5)

  })
})