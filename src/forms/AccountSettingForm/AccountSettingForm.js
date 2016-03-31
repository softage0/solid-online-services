import React from 'react'
import { reduxForm } from 'redux-form'
import { updateAccount, getAccountById } from '../../redux/modules/account'

export const fields = ['_id', 'id', 'password', 'name', 'email']

const validate = (values) => {
  const errors = {}
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

  defaultProps = {
    fields: {}
  }

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
