import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { HomeView } from 'views/HomeView/HomeView'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<HomeView {...props} />)
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<HomeView {...props} />)
}

describe('(View) Home', function () {
  let _component, _rendered, _props

  beforeEach(function () {
    _component = shallowRenderWithProps(_props)
    _rendered = renderWithProps(_props)
  })

  it('Should render as a <div>.', function () {
    expect(_component.type).to.equal('div')
  })

  it('Should include an <h1> with title text.', function () {
    const h1 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h1')

    expect(h1).to.exist
    expect(h1.textContent).to.match(/Solid Online Services/)
  })

  it('Should render with an <p> that includes the instruction text.', function () {
    const p = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'p')

    expect(p).to.exist
    expect(p.textContent).to.match(/Please select one of the above functions you want to use./)
  })
})
