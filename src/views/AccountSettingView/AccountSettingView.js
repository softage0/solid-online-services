import React from 'react'
import AccountSettingForm from '../../forms/AccountSettingForm'

type Props = {
  params: Object
};

export class AccountSetting extends React.Component {
  props: Props;

  render () {
    return (
      <AccountSettingForm params={this.props.params} />
    )
  }
}

export default AccountSetting
