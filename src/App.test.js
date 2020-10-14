import React from 'react';
import { render, queryByAttribute, fireEvent } from '@testing-library/react';
import App from './App';

const getById = queryByAttribute.bind(null, 'id');

test('should load topbar with Mail heading', () => {
  const { getByText } = render(<App />);
  const topbar = getByText("Mail");
  expect(topbar).toBeInTheDocument();
});

test('should load sidebar with Inbox and total number of emails', () => {
  const { getByText } = render(<App />);
  const sidebar = getByText("Inbox (10)");
  expect(sidebar).toBeInTheDocument();
});

test('should delete an email and update the total on the sidebar', () => {
  const {getByText, container} = render(<App />);
  const deleteButton = getById(container, 'delete-1');
  fireEvent.click(deleteButton)
  const sidebar = getByText("Inbox (9)");
  expect(sidebar).toBeInTheDocument();
});

