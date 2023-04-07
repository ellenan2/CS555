import React from 'react';
import { shallow } from 'enzyme';
import CurrentOffers from './CurrentOffers';

describe('CurrentOffers component', () => {
  it('renders without crashing', () => {
    shallow(<CurrentOffers />);
  });
});
