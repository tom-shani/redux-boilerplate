import config from '../../config'
import {connect} from 'react-redux'
import {IndexLink} from 'react-router'
import {MenuItem, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {push} from 'react-router-redux'
import React, {Component, PropTypes} from 'react'

@connect(
  (state) => ({appTitle: config.app.title}),
  (dispatch) => ({dispatch}))
export default class Header extends Component {
  static propTypes = {
    appTitle: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {isOpen: false}
  }

  shouldComponentUpdate = (nextProps, nextState) =>
     this.props.pathname !== nextProps.pathname || this.state.isOpen !== nextState.isOpen

  renderSubNavItem = (item, i) => (
    <MenuItem
      children={item.title}
      eventKey={`3.${i}`}
      isActive={this.props.pathname === item.path}
      onClick={(event) => { // eslint-disable-line react/jsx-no-bind
        event.preventDefault()
        this.props.dispatch(push(item.path))
      }}
    />
  )

  render() {
    const {renderSubNavItem} = this

    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to='/'>
              {this.props.appTitle}
            </IndexLink>
          </Navbar.Brand>
          <Nav>
            <NavDropdown eventKey={3} id='nav-dropdown' title='Dropdown'>
              {renderSubNavItem({path: '/abc', title: 'Page Doesn\'t Exist'}, 1)}
            </NavDropdown>
          </Nav>
          <Navbar.Toggle/>
        </Navbar.Header>
      </Navbar>
    )
  }
}
