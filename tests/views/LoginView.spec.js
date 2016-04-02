import React from 'react'
import LoginView from 'views/LoginView/LoginView'
import LoginForm from 'forms/LoginForm/LoginForm'
import { shallow } from 'enzyme';

describe('(View) Login', () => {
  it('Should render as a <LoginForm>.', () => {
    const wrapper = shallow(<LoginView />);
    expect(wrapper.is(LoginForm)).to.equal(true)
  })
})
