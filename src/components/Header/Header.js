import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

type Props = {
  account: Object
};

export class Header extends React.Component<void, Props, void> {
  static propTypes = {
    account: PropTypes.object.isRequired
  };

  render () {
    return (
      <nav className='navbar navbar-inverse navbar-fixed-top'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse'
              data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <Link className='navbar-brand' to='/'>Solid Online Services</Link>
          </div>
          <div id='navbar' className='navbar-collapse collapse'>
            {this.props.account.showSignUpSuccess &&
              <p className='navbar-text'>Sign Up Success</p>}
            {this.props.account.showLoginSuccess &&
              <p className='navbar-text'>Login Success</p>}

            <ul className='nav navbar-nav navbar-right'>
              <li><Link to='/signup'>Sign Up</Link></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/admin'>Admin</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  account: state.account
})

export default connect(mapStateToProps, {
})(Header)
