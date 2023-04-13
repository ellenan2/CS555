import React, { useState, useEffect } from "react";
import axios from 'axios';
import { render, waitFor } from '@testing-library/react';
import SalesRepBillingPage from './SalesRepBillingPage';

jest.mock('axios');

describe('SalesRepBillingPage', () => {
  it('should render sales data', async () => {
    const testData = [
      {
        service: 'Service 1',
        description: 'Description 1',
        date: '2022-05-01',
        customer: 'Customer 1',
        amount: 100
      },
      {
        service: 'Service 2',
        description: 'Description 2',
        date: '2022-05-02',
        customer: 'Customer 2',
        amount: 200
      }
    ];

    axios.get.mockResolvedValue({ data: testData });

    const { getByText } = render(<SalesRepBillingPage />);

    await waitFor(() => {
      expect(getByText('Service 1')).toBeInTheDocument();
      expect(getByText('Description 1')).toBeInTheDocument();
      expect(getByText('2022-05-01')).toBeInTheDocument();
      expect(getByText('Customer 1')).toBeInTheDocument();
      expect(getByText('100.00')).toBeInTheDocument();

      expect(getByText('Service 2')).toBeInTheDocument();
      expect(getByText('Description 2')).toBeInTheDocument();
      expect(getByText('2022-05-02')).toBeInTheDocument();
      expect(getByText('Customer 2')).toBeInTheDocument();
      expect(getByText('200.00')).toBeInTheDocument();
    });
  });

  it('should handle error while fetching sales data', async () => {
    axios.get.mockRejectedValue({});

    const { getByText } = render(<SalesRepBillingPage />);

    await waitFor(() => {
      expect(getByText('Error fetching sales data')).toBeInTheDocument();
    });
  });
});
