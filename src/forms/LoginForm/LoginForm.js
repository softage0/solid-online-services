import React from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form';
import { login } from '../../redux/account'
import AccountDetailField from '../../components/AccountDetailField/AccountDetailField'

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

export class Login extends React.Component {
  render () {
    const {handleSubmit, resetForm, account} = this.props;

    return (
      <form className='form-horizontal' onSubmit={handleSubmit((values, dispatch) => dispatch(login(values)))}>
        <fieldset>
          <legend>Login</legend>
          <Field name="id" fieldName='ID' component={AccountDetailField} />
          <Field name="password" fieldName='Password' component={AccountDetailField} type="password" />
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

let InitializeFromStateForm = reduxForm({
  form: 'Login',
  validate
})(Login);

InitializeFromStateForm = connect(
  state => ({
    account: state.account,
  }),
)(InitializeFromStateForm);


export default InitializeFromStateForm;
