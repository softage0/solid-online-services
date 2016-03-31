import React from 'react'

type Props = {
  accounts: Array,
  itemFunction: Function
};

export class AccountList extends React.Component<void, Props, void> {
  // JSX props should not use .bind() according to eslint rule,
  // bind each function for all mapping items outside of JSX.
  defineMappingfunctions () {
    this.eachFunction = {}
    this.props.accounts.forEach((account) => {
      if (this.props.itemFunction) {
        this.eachFunction[account._id] = this.props.itemFunction.bind(this, account.id)
      } else {
        this.eachFunction[account._id] = () => {}
      }
    })
  }

  props: Props;

  render () {
    this.defineMappingfunctions()

    return (
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
        {this.props.accounts.map(function (account) {
          return <tr key={account._id} onClick={this.eachFunction[account._id]}>
            <td>{account.id}</td>
            <td>{account.name}</td>
            <td>{account.email}</td>
          </tr>
        }.bind(this))}
        </tbody>
      </table>
    )
  }
}

export default AccountList

