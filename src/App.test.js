import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('should load topbar with Mail heading', () => {
  const { getByText } = render(<App />);
  const topbar = getByText("Mail");
  expect(topbar).toBeInTheDocument();
});

test('should load sidebar with Inbox and number of emails', () => {
  const { getByText } = render(<App />);
  const sidebar = getByText("Inbox (10)");
  expect(sidebar).toBeInTheDocument();
});

