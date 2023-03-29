import React, { useState } from 'react';
import { shallow } from 'enzyme';
import OngoingServices from '../components/OngoingServices.js';
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('OngoingServices component', () => {
  it('renders without crashing', () => {
    shallow(React.createElement(OngoingServices));
  });

  it('renders a list of services when serviceData is present', () => {
    const serviceData = [            { id: 1, title: 'Service 1', _id: 'service1' },       { id: 2, title: 'Service 2', _id: 'service2' },       { id: 3, title: 'Service 3', _id: 'service3' },       ];

    const wrapper = shallow(React.createElement(OngoingServices));
    const setState = jest.fn();
    useState.mockImplementationOnce(init => [init, setState]);
    wrapper.find('OngoingServices').props().setServiceData(serviceData);
    wrapper.update();
    expect(wrapper.find('Card')).toHaveLength(3);
  });
});
