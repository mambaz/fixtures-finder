// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders fixtures listing page by default', () => {
  render(<App />);
  const linkElement = screen.getByText(/Fixtures Listing Page/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders calendar page when the route is /calendar', () => {
  // Render App with a mocked router location
  window.history.pushState({}, 'Test page', '/calendar');
  render(<App />);
  
  const linkElement = screen.getByText(/Calendar Page/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders page not found when the route does not match', () => {
  // Render App with a mocked router location
  window.history.pushState({}, 'Test page', '/invalid-route');
  render(<App />);
  
  const linkElement = screen.getByText(/Page Not Found/i);
  expect(linkElement).toBeInTheDocument();
});
