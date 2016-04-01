import React from 'react'
import { reduxForm } from 'redux-form'
import { login } from '../../redux/modules/account'
import AccountDetailField from '../../components/AccountDetailField/AccountDetailField'

export const fields = ['id', 'password']

const validate = (values) => {
  const errors = {}
  if (!values.id) {
    errors.id = 'Required'
  } else if (values.id.length > 15) {
    errors.id = 'Must be 15 characters or less'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
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

  render () {
    const { fields: {id, password}, handleSubmit, resetForm, account } = this.props

    return (
      <form className='form-horizontal' onSubmit={handleSubmit((values, dispatch) => dispatch(login(values)))}>
        <fieldset>
          <legend>Login</legend>
          <AccountDetailField field={id} fieldName='ID' />
          <AccountDetailField field={password} fieldName='Password' type='password' />
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

export default reduxForm(
  {
    form: 'Login',
    fields,
    validate
  },
  (state) => ({
    account: state.account
  })
)(Login)
