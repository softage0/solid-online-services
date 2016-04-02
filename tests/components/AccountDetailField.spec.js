import React from 'react'
import AccountDetailField from 'components/AccountDetailField/AccountDetailField'
import { shallow } from 'enzyme';

describe('(Component) AccountDetailField', () => {
  let _props

  beforeEach(function () {
    _props = {
      field: {
        touched: {}
      }
    }
  })

  it('Should render as a <div>.', () => {
    const wrapper = shallow(<AccountDetailField {..._props} />);
    expect(wrapper.is('div')).to.equal(true)
  })
})
