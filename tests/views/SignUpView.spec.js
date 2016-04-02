import React from 'react'
import SignUpView from 'views/SignUpView/SignUpView'
import SignUpForm from 'forms/SignUpForm/SignUpForm'
import { shallow } from 'enzyme';

describe('(View) SignUp', () => {
  it('Should render as a <SignUpForm>.', () => {
    const wrapper = shallow(<SignUpView />);
    expect(wrapper.is(SignUpForm)).to.equal(true)
  })
})
