import React, { Component } from 'react';
import {
  Navbar as MDBNavbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler,
  Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Fa,
} from 'mdbreact';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actionTypes from '../../store/actions';
import getElemById from '../Categories/helpers/getElemById';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    const { isOpen } = this.state;
    this.toggleCollapse = () => this.setState({ isOpen: !isOpen });
  }

  render() {
    const { user, onLogin, onLogout, users } = this.props;
    const { isOpen } = this.state;
    const userInfo = getElemById(users, user.user_id);

    return (
      <MDBNavbar color="blue" dark expand="md">
        <NavbarBrand>
          <strong className="white-text">Mipt Overflow</strong>
        </NavbarBrand>
        <NavbarToggler
          onClick={this.toggleCollapse}
        />
        {
          user.is_authorized
            ? (
              <Collapse id="navbarCollapse3" isOpen={isOpen} navbar>
                <NavbarNav left>
                  <NavItem active>
                    <NavLink to="/">О проекте</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/user/">Обо мне</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/category/list/">Категории</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/">Топики</NavLink>
                  </NavItem>
                  <NavItem>
                    <Dropdown>
                      <DropdownToggle nav caret>
                        <div className="d-none d-md-inline">Контент</div>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-default" right>
                        <DropdownItem href="/">Мои топики</DropdownItem>
                        <DropdownItem href="/">Мои ответы</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </NavItem>
                </NavbarNav>
                <NavbarNav right>
                  <NavItem>
                    <NavLink to="/">{userInfo.login}</NavLink>
                  </NavItem>
                  <NavItem>
                    <Dropdown>
                      <DropdownToggle nav caret>
                        <Fa icon="user" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-default" right>
                        <DropdownItem href="/">Профиль</DropdownItem>
                        <DropdownItem href="/">Настройки</DropdownItem>
                        <DropdownItem href="/" onClick={onLogout}>Выход</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </NavItem>
                </NavbarNav>
              </Collapse>
            ) : (
              <NavbarNav right>
                <NavItem>
                  <NavLink to="/" onClick={onLogin}>Войти</NavLink>
                </NavItem>
              </NavbarNav>
            )
        }

      </MDBNavbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.ctr.users,
    user: state.usr.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (event) => {
      event.preventDefault();
      dispatch({ type: actionTypes.USER_LOGIN });
    },
    onLogout: (event) => {
      event.preventDefault();
      dispatch({ type: actionTypes.USER_LOGOUT });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);


Navbar.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      login: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  user: PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    is_authorized: PropTypes.bool.isRequired,
  }).isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};
