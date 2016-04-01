import React from 'react'
import { reduxForm } from 'redux-form'
import { updateAccount, getAccountById } from '../../redux/modules/account'
import AccountDetailField from '../../components/AccountDetailField/AccountDetailField'

export const fields = ['_id', 'id', 'password', 'name', 'email']

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

type Props = {
  handleSubmit: Function,
  resetForm: Function,
  account: Object,
  fields: Object,
  params: Object,
  getAccountById: Function
}

export class AccountSetting extends React.Component {
  props: Props;

  componentWillMount () {
    this.props.getAccountById(this.props.params.id)
  }

  render () {
    const { fields: {_id, id, password, name, email}, handleSubmit, resetForm, account } = this.props

    return (
      <form className='form-horizontal' onSubmit={handleSubmit((values, dispatch) => dispatch(updateAccount(values)))}>
        <fieldset>
          <legend>Login</legend>
          <input type='hidden' {..._id}/>
          <AccountDetailField field={id} fieldName='ID' />
          <AccountDetailField field={password} fieldName='Password' type='password' />
          <AccountDetailField field={name} fieldName='Name' />
          <AccountDetailField field={email} fieldName='Email' />
          <div className='form-group'>
            <div className='col-lg-10 col-lg-offset-2'>
              <button type='reset' className='btn btn-default' onClick={resetForm}>Reset</button>
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
    form: 'AccountSetting',
    fields,
    validate
  },
  (state) => ({
    initialValues: state.account.accountDetail,
    account: state.account
  }),
  {getAccountById}
)(AccountSetting)
