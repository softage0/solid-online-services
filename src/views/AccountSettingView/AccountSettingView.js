import React from 'react'
import AccountSettingForm from '../../forms/AccountSettingForm'

export class AccountSetting extends React.Component {
  render () {
    return (
      <AccountSettingForm params={this.props.params} />
    )
  }
}

export default AccountSetting
