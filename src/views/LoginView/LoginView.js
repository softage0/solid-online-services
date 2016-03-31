import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import LoginForm from '../../forms/LoginForm'

type Props = {
  account: Object
};

export class Login extends React.Component<void, Props, void> {
  static propTypes = {
    account: PropTypes.object.isRequired
  };

  render () {
    return (
      <LoginForm account={this.props.account} />
    )
  }
}

const mapStateToProps = (state) => ({
  account: state.account
})

export default connect(mapStateToProps, {
})(Login)
