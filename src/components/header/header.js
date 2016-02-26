import config from '../../config';
import {connect} from 'react-redux';
import {IndexLink} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import React, {Component, PropTypes} from 'react';

@connect(
  (state) => ({
    appTitle: config.app.title,
    pathname: state.router.location.pathname
  }),
  (dispatch) => ({dispatch}))
export default class Header extends Component {
  static propTypes = {
    appTitle: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {isOpen: false};
  }

  shouldComponentUpdate = (nextProps, nextState) =>
     this.props.pathname !== nextProps.pathname || this.state.isOpen !== nextState.isOpen;

  _closeMenu = (e) => {
    this.setState({isOpen: false});
  }

  _onToggle = (e) => {
    this.setState({isOpen: !this.state.isOpen});
  }

  renderSubNavItem = (item, i) => (
    <LinkContainer key={`main-nav-item-${i}`} to={{pathname: item.path}}>
      <MenuItem eventKey={`3.${i}`} isActive={this.props.pathname === item.path} onClick={this._closeMenu}>
        {item.title}
      </MenuItem>
    </LinkContainer>
  );

  render() {
    const {renderSubNavItem} = this;

    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to='/'>
              {this.props.appTitle}
            </IndexLink>
          </Navbar.Brand>
          <Nav>
            <LinkContainer key='main-nav-item-1' to='/sample-page'>
              <NavItem eventKey={1} isActive={this.props.pathname === '/sample-page'} onClick={this._closeMenu}>
                Sample Page
              </NavItem>
            </LinkContainer>
            <NavDropdown eventKey={3} id='nav-dropdown' title='Dropdown'>
              {renderSubNavItem({path: '/abc', title: 'Page Doesn\'t Exist'}, 1)}
              {renderSubNavItem({path: '/def', title: 'Me Neither'}, 2)}
              <MenuItem divider />
              {renderSubNavItem({path: '/sample-page', title: 'Sample Page'}, 3)}
            </NavDropdown>
          </Nav>
          <Navbar.Toggle/>
        </Navbar.Header>
      </Navbar>
    );
  }
}
