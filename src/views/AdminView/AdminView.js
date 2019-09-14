import React from 'react'
import { connect } from 'react-redux'
import { updateAccountList, redirectToAccountSettingForm } from '../../redux/account'
import AccountList from '../../components/AccountList/AccountList'

export class Admin extends React.Component {
  componentDidMount() {
    this.props.updateAccountList()
  }

  render () {
    return (
      <div>
        <h3>Administrator Page</h3>
        <p>Please select one of the below accounts you want to edit.</p>
        <br />

        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Account List</h3>
          </div>
          <AccountList accounts={this.props.account.accounts} itemFunction={this.props.redirectToAccountSettingForm} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  account: state.account
})

export default connect(mapStateToProps, {
  updateAccountList,
  redirectToAccountSettingForm
})(Admin)
