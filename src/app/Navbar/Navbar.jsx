import React, { Component } from 'react';
import {
  Navbar as MDBNavbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler,
  Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Fa,
} from 'mdbreact';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    const { isOpen } = this.state;
    this.toggleCollapse = () => this.setState({ isOpen: !isOpen });
  }

  render() {
    const { isOpen } = this.state;
    return (
      <MDBNavbar color="blue" dark expand="md">
        <NavbarBrand>
          <strong className="white-text">Mipt Overflow</strong>
        </NavbarBrand>

        <NavbarToggler
          onClick={this.toggleCollapse}
        />

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
              <Dropdown>
                <DropdownToggle nav caret>
                  <Fa icon="user" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-default" right>
                  <DropdownItem href="#">Профиль</DropdownItem>
                  <DropdownItem href="#">Настройки</DropdownItem>
                  <DropdownItem href="#">Выход</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
          </NavbarNav>
        </Collapse>
      </MDBNavbar>
    );
  }
}
