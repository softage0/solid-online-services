import React from 'react'
import AccountSettingForm from '../../forms/AccountSettingForm'

type Props = {
  accounts: Array,
  itemFunction: Function
};

export class AccountList extends React.Component<void, Props, void> {
  constructor (props) {
    super(props)
    this.state = { activeFormId: null }
  }
  // JSX props should not use .bind() according to eslint rule,
  // bind each function for all mapping items outside of JSX.
  defineMappingfunctions () {
    this.eachFunction = {}
    this.userId = {}
    if (this.props.itemFunction) {
      this.props.accounts.forEach((account) => {
        this.eachFunction[account._id] =
          () => { this.setState({activeFormId: account.id !== this.state.activeFormId ? account.id : null}) }
        this.userId[account._id] = account.id
      })
      this.itemStyle = {
        cursor: 'pointer'
      }
    } else {
      this.props.accounts.forEach((account) => {
        this.eachFunction[account._id] = () => {}
      })
    }
  }

  props: Props;

  render () {
    this.defineMappingfunctions()

    return (
      <div>
        <table className='table table-hover table-head-only'>
          <thead>
            <tr>
              <th className='col-xs-2'>id</th>
              <th className='col-xs-4'>name</th>
              <th className='col-xs-6'>email</th>
            </tr>
          </thead>
        </table>
          {this.props.accounts.map(function (account) {
            return <div key={account._id}>
              <table className='table table-hover one-row-table'>
                <tbody>
                  <tr onClick={this.eachFunction[account._id]} style={this.itemStyle}>
                    <td className='col-xs-2'>{account.id}</td>
                    <td className='col-xs-4'>{account.name}</td>
                    <td className='col-xs-6'>{account.email}</td>
                  </tr>
                </tbody>
              </table>
              {this.state.activeFormId === account.id
                ? <AccountSettingForm key={account._id} userId={this.userId[account._id]} /> : null}

            </div>
          }.bind(this))}
      </div>
    )
  }
}

export default AccountList

