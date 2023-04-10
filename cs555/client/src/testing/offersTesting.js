import React from 'react';
import { shallow } from 'enzyme';
import OngoingServices from './OngoingServices';

describe('OngoingServices component', () => {
  it('renders without crashing', () => {
    shallow(<OngoingServices />);
  });

  it('displays a loading message when loading state is true', () => {
    const wrapper = shallow(<OngoingServices />);
    wrapper.setState({ loading: true });
    expect(wrapper.find('h2').text()).toEqual('Loading . . . .');
  });

  it('displays an error message when error state is true', () => {
    const wrapper = shallow(<OngoingServices />);
    wrapper.setState({ error: true });
    expect(wrapper.find('h2').text()).toEqual('404 Page Not Found');
  });

  it('renders a list of services when serviceData is present', () => {
    const serviceData = [      { id: 1, title: 'Service 1', _id: 'service1' },      { id: 2, title: 'Service 2', _id: 'service2' },      { id: 3, title: 'Service 3', _id: 'service3' },    ];
    const wrapper = shallow(<OngoingServices />);
    wrapper.setState({ loading: false, serviceData });
    expect(wrapper.find('Card')).toHaveLength(3);
  });

 
});
