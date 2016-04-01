import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateAccountList, redirectToAccountSettingForm } from '../../redux/modules/account'
import AccountList from '../../components/AccountList/AccountList'

type Props = {
  account: Object,
  updateAccountList: Function,
  redirectToAccountSettingForm: Function
};

export class Admin extends React.Component {
  props: Props;

  static propTypes = {
    account: PropTypes.object.isRequired,
    updateAccountList: PropTypes.func.isRequired,
    redirectToAccountSettingForm: PropTypes.func.isRequired
  };

  componentWillMount () {
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
