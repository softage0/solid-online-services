import React, { PropTypes } from 'react'
import '../../styles/core.scss'
import Header from '../../components/Header/Header'

export class CoreLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element
  };

  render () {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export default CoreLayout
