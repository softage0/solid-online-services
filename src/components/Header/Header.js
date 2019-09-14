import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../../redux/account'

export class Header extends React.Component {
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
            <NavLink className='navbar-brand' to='/'>Solid Online Services</NavLink>
          </div>
          <div id='navbar' className='navbar-collapse collapse'>
            {this.props.account.isFetching &&
              <p className='navbar-text'>Loading...</p>}
            {this.props.account.showSignUpSuccess &&
              <p className='navbar-text'>Sign Up Success</p>}
            {this.props.account.showLoginSuccess &&
              <p className='navbar-text'>Login Success</p>}
            {this.props.account.showAccountUpdateSuccess &&
              <p className='navbar-text'>Account Update Success</p>}

            <ul className='nav navbar-nav navbar-right'>
              <li><NavLink to='/admin'>Admin</NavLink></li>
              {!this.props.account.accountInfo &&
                <li><NavLink to='/signup'>Sign Up</NavLink></li>}
              {!this.props.account.accountInfo &&
                <li><NavLink to='/login'>Login</NavLink></li>}
              {this.props.account.accountInfo &&
                <li>
                  <NavLink to='/login' onClick={this.props.logout}>{this.props.account.accountInfo.name} logout</NavLink>
                </li>}
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
  logout
})(Header)
