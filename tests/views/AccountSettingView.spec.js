import React from 'react'
import AccountSettingView from 'views/AccountSettingView/AccountSettingView'
import AccountSettingForm from 'forms/AccountSettingForm/AccountSettingForm'
import { shallow } from 'enzyme';

describe('(View) AccountSetting', () => {
  it('Should render as a <AccountSettingForm>.', () => {
    const wrapper = shallow(<AccountSettingView />);
    expect(wrapper.is(AccountSettingForm)).to.equal(true)
  })
})
