/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateAccountList } from '../../redux/modules/account'
import AccountList from '../../components/AccountList/AccountList'

type Props = {
  account: Object,
  updateAccountList: Function
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component<void, Props, void> {
  static propTypes = {
    account: PropTypes.object.isRequired,
    updateAccountList: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.props.updateAccountList()
  }

  render () {
    return (
      <div>
        <h1>Solid Online Services</h1>
        <p>Please select one of the above functions you want to use.</p>
        <br />

        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Account List</h3>
          </div>
          <AccountList accounts={this.props.account.accounts} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  account: state.account
})

export default connect(mapStateToProps, {
  updateAccountList
})(HomeView)
