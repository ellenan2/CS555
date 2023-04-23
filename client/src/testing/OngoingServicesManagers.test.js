import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import OngoingServices from './OngoingServices';

jest.mock('../firebase/FirebaseFunctions', () => ({
  getSessionToken: jest.fn(() => 'fakeAccessToken')
}));

jest.mock('axios');

describe('OngoingServices component', () => {
  it('renders a loading message when data is loading', async () => {
    // mock the axios.get function to always return a promise that never resolves
    jest.spyOn(require('axios'), 'get').mockImplementation(() => new Promise(() => {}));

    render(<OngoingServices />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // restore axios.get to its original implementation
    require('axios').get.mockRestore();
  });

  it('renders a 404 message when there is an error', async () => {
    // mock the axios.get function to always reject with an error
    jest.spyOn(require('axios'), 'get').mockRejectedValue(new Error('fake error'));

    render(<OngoingServices />);

    expect(screen.getByText(/404 Page Not Found/i)).toBeInTheDocument();

    // restore axios.get to its original implementation
    require('axios').get.mockRestore();
  });

  it('renders a list of services when data is fetched successfully', async () => {
    const mockServiceData = [
      { id: '1', title: 'Service 1', desc: 'Service 1 description', fromDate: '2022-01-01', cost: 100, status: 'in progress' },
      { id: '2', title: 'Service 2', desc: 'Service 2 description', fromDate: '2022-02-01', cost: 200, status: 'completed' }
    ];

    // mock the axios.get function to return mockServiceData
    jest.spyOn(require('axios'), 'get').mockResolvedValue({ data: mockServiceData });

    render(<OngoingServices />);

    // wait for the service data to load
    await waitFor(() => expect(screen.getByText(/Service 1/i)).toBeInTheDocument());

    // check that the service list is displayed correctly
    expect(screen.getByText(/Ongoing Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Service 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Service 1 description/i)).toBeInTheDocument();
    expect(screen.getByText(/2022-01-01/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100/i)).toBeInTheDocument();
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Go To/i)).toBeInTheDocument();

    // check that the status can be updated
    const select = screen.getByLabelText(/status/i);
    fireEvent.change(select, { target: { value: 'completed' } });

    // wait for the status update to finish
    await waitFor(() => expect(require('axios').patch).toHaveBeenCalled());

    // restore axios.get to its original implementation
    require('axios').get.mockRestore();
  });
});
