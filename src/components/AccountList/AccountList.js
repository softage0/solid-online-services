import React from 'react'

type Props = {
  accounts: Array
};

export class AccountList extends React.Component {
  props: Props;

  render () {
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
          return <tr key={account._id}>
            <td>{account.id}</td>
            <td>{account.name}</td>
            <td>{account.email}</td>
          </tr>
        })}
        </tbody>
      </table>
    )
  }
}

export default AccountList

