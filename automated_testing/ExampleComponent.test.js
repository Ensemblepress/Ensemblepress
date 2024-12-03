// ExampleComponent.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import ExampleComponent from './ExampleComponent.js';

describe('ExampleComponent', () => {
  it('renders the component', () => {
    render(<ExampleComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
