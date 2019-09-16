import React from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form';
import { signUp } from '../../redux/account'
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
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

export class SignUp extends React.Component {
  render () {
    const {handleSubmit, resetForm, account} = this.props;

    return (
      <form className='form-horizontal' onSubmit={handleSubmit((values, dispatch) => dispatch(signUp(values)))}>
        <fieldset>
          <legend>Sign Up</legend>
          <Field name="id" fieldName='ID' component={AccountDetailField} />
          <Field name="password" fieldName='Password' type="password" component={AccountDetailField} />
          <Field name="name" fieldName='Name' component={AccountDetailField} />
          <Field name="email" fieldName='Email' component={AccountDetailField} />
          <div className='form-group'>
            <div className='col-lg-10 col-lg-offset-2'>
              <button type='reset' className='btn btn-default' onClick={resetForm}>Cancel</button>
              <button type='submit' className='btn btn-primary'>Submit</button>
              {account.showInvalidCredential &&
                <span className='label label-default'>Invalid Credential: Please choose another ID.</span>}
            </div>
          </div>
        </fieldset>
      </form>
    )
  }
}

let InitializeFromStateForm = reduxForm({
  form: 'SignUp',
  validate,
})(SignUp);

InitializeFromStateForm = connect(
  state => ({
    account: state.account,
  }),
)(InitializeFromStateForm);


export default InitializeFromStateForm;
