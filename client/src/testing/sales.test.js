import React from 'react';
import { render, screen } from '@testing-library/react';
import Sales from './Sales';

describe('Sales Component', () => {
  test('renders sales table with data', () => {
    render(<Sales />);
    const dateColumn = screen.getByText(/Date/i);
    const nameColumn = screen.getByText(/Name/i);
    const phoneColumn = screen.getByText(/Phone/i);
    const emailColumn = screen.getByText(/Email/i);
    const idColumn = screen.getByText(/ID/i);
    expect(dateColumn).toBeInTheDocument();
    expect(nameColumn).toBeInTheDocument();
    expect(phoneColumn).toBeInTheDocument();
    expect(emailColumn).toBeInTheDocument();
    expect(idColumn).toBeInTheDocument();
    expect(jonRow).toBeInTheDocument();
    expect(ronRow).toBeInTheDocument();
  });

  test('renders link for each sale ID', () => {
    render(<Sales />);
    const jonLinkId = screen.getByText(/642359156e45edf1e3a2a88b/i);
    const ronLinkId = screen.getByText(/64232efcc2af78f9f44b6694/i);
    expect(jonLinkId).toHaveAttribute('href', '/sales/642359156e45edf1e3a2a88b');
    expect(ronLinkId).toHaveAttribute('href', '/sales/64232efcc2af78f9f44b6694');
  });
});
