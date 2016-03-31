import React from 'react'
import { reduxForm } from 'redux-form'
import { login } from '../../redux/modules/account'

export const fields = ['id', 'password']

const validate = (values) => {
  const errors = {}
  return errors
}

type Props = {
  handleSubmit: Function,
  resetForm: Function,
  account: Object,
  fields: Object
}

export class Login extends React.Component {
  props: Props;

  defaultProps = {
    fields: {}
  }

  render () {
    const { fields: {id, password}, handleSubmit, resetForm, account } = this.props

    return (
      <form className='form-horizontal' onSubmit={handleSubmit((values, dispatch) => dispatch(login(values)))}>
        <fieldset>
          <legend>Login</legend>
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
            <div className='col-lg-10 col-lg-offset-2'>
              <button type='reset' className='btn btn-default' onClick={resetForm}>Cancel</button>
              <button type='submit' className='btn btn-primary'>Submit</button>
              {account.showInvalidCredential &&
                <span className='label label-default'>Invalid Credential: Please enter again.</span>}
            </div>
          </div>
        </fieldset>
      </form>
    )
  }
}

export default reduxForm({
  form: 'Login',
  fields,
  validate
})(Login)
