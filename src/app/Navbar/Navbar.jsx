import React, { Component } from 'react';
import {
  Navbar as MDBNavbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler,
  Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Fa,
} from 'mdbreact';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../store/actions/auth';
import { getAllUsers } from '../../store/actions/categories';
import getElemById from '../Categories/helpers/getElemById';

class Navbar extends Component {
  constructor(props) {
    super(props);

    props.getAllUsers();

    this.state = {
      isOpen: false,
    };

    const { isOpen } = this.state;
    this.toggleCollapse = () => this.setState({ isOpen: !isOpen });
  }

  render() {
    const {
      userId, onLogout, users, isAuthorized,
    } = this.props;
    const { isOpen } = this.state;
    let userInfo = getElemById(users, userId);

    if (!userInfo) {
      userInfo = { login: 'Loading' };
    }

    return (
      <MDBNavbar color="blue" dark expand="md">
        <NavbarBrand>
          <strong className="white-text">Mipt Overflow</strong>
        </NavbarBrand>
        <NavbarToggler
          onClick={this.toggleCollapse}
        />
        {
          isAuthorized
            ? (
              <Collapse id="navbarCollapse3" isOpen={isOpen} navbar>
                <NavbarNav left>
                  <NavItem active>
                    <NavLink to="/">О проекте</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/feedback">Оставить фидбэк</NavLink>
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
                  <NavLink to="/register">Зарегистрироваться</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/login">Войти</NavLink>
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
    userId: state.auth.userId,
    isAuthorized: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: (event) => {
      event.preventDefault();
      dispatch(logout());
    },
    getAllUsers: () => dispatch(getAllUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);


Navbar.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      login: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  userId: PropTypes.number.isRequired,
  onLogout: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
};
