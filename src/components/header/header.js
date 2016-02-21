import React, {Component, PropTypes} from 'react';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {routeActions} from 'react-router-redux';
import config from '../../config';

@connect(
  (state) => ({
    appTitle: config.app.title,
    pathname: state.routing.location.pathname
  }),
  (dispatch) => ({dispatch}))
export default class Header extends Component {
  static propTypes = {
    appTitle: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.pathname !== nextProps.pathname;
  }

  push = (path, e) => {
    e.preventDefault();
    this.props.dispatch(routeActions.push(path));
  };

  render() {
    const {push} = this;

    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a onClick={function goHome(e) { push('/', e); }}>
              {this.props.appTitle}
            </a>
          </Navbar.Brand>
          <Nav>
            <NavItem eventKey={1} onClick={function goSamplePage(e) { push('/sample-page', e); }}>Sample Page</NavItem>
            <NavDropdown eventKey={3} id='nav-dropdown' title='Dropdown'>
              <MenuItem eventKey={3.1} onClick={function goRandom(e) { push('/abc', e); }}>
                Page Doesn't Exist
              </MenuItem>
              <MenuItem eventKey={3.2} onClick={function goRandomer(e) { push('/def', e); }}>
                Me Neither
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3} onClick={function goSamplePage(e) { push('/sample-page', e); }}>
                Sample Page
              </MenuItem>
            </NavDropdown>
          </Nav>
          <Navbar.Toggle/>
        </Navbar.Header>
      </Navbar>
    );
  }
}
