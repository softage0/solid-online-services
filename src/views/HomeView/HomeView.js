/* @flow */
import React from 'react'

type Props = {
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component {
  props: Props

  render () {
    return (
      <div>
        <h1>Solid Online Services</h1>
        <p>Please select one of the above functions you want to use.</p>
      </div>
    )
  }
}

export default HomeView
