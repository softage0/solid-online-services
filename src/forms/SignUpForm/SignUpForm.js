import React from 'react'
import { reduxForm } from 'redux-form'
import { signUp } from '../../redux/modules/account'

export const fields = ['id', 'password', 'name', 'email']

const validate = (values) => {
  const errors = {}
  return errors
}

type Props = {
  handleSubmit: Function,
  fields: Object,
  isFetching: Boolean
}

export class SignUp extends React.Component {
  props: Props;

  defaultProps = {
    fields: {}
  };

  render () {
    const { fields: {id, password, name, email}, handleSubmit, isFetching } = this.props

    return (
      <form className='form-horizontal' onSubmit={handleSubmit((values, dispatch) => { dispatch(signUp(values)) })}>
        <fieldset>
          <legend>Sign Up</legend>
          <div className='form-group'>
            <label htmlFor='inputId' className='col-lg-2 control-label'>ID</label>
            <div className='col-lg-10'>
              <input type='text' className='form-control' id='inputId' placeholder='ID' {...id}/>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='inputPassword' className='col-lg-2 control-label'>Password</label>
            <div className='col-lg-10'>
              <input type='password' className='form-control' id='inputPassword' placeholder='Password' {...password}/>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='inputName' className='col-lg-2 control-label'>Name</label>
            <div className='col-lg-10'>
              <input type='text' className='form-control' id='inputName' placeholder='Name' {...name}/>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='inputEmail' className='col-lg-2 control-label'>Email</label>
            <div className='col-lg-10'>
              <input type='text' className='form-control' id='inputEmail' placeholder='Email' {...email}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-lg-10 col-lg-offset-2'>
              <button type='reset' className='btn btn-default'>Cancel</button>
              <button type='submit' className='btn btn-primary'>Submit</button>
              {isFetching && <span className='label label-default'>Signing up...</span>}
            </div>
          </div>
        </fieldset>
      </form>
    )
  }
}

export default reduxForm({
  form: 'SignUp',
  fields,
  validate
})(SignUp)
