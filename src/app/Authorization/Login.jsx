import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Container, Button } from 'mdbreact';

import Input from '../../components/Input/Input';
import { login } from '../../store/actions/auth';

import valueIsValid from '../../helpers/validationHelpers';

class Login extends Component {
  state={
    formIsValid: false,
    controls: {
      username: {
        value: '',
        elementConfig: {
          label: 'Логин',
          type: 'text',
        },
        touched: false,
        valid: false,
        validation: {
          required: true,
        },
      },
      password: {
        value: '',
        elementConfig: {
          label: 'Пароль',
          type: 'password',
        },
        touched: false,
        valid: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  onInputChange = (event, name) => {
    const { controls } = this.state;
    const updatedControls = {
      ...controls,
      [name]: {
        ...controls[name],
        value: event.target.value,
        valid: valueIsValid(event.target.value, controls[name].validation),
        touched: true,
      },
    };
    const formIsValid = Object.keys(updatedControls).every(key => updatedControls[key].valid);
    this.setState({ controls: updatedControls, formIsValid });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    const { onAuth } = this.props;
    const { controls } = this.state;
    onAuth(
      controls.username.value,
      controls.password.value,
    );
  };

  render() {
    const { controls, formIsValid } = this.state;
    const formElements = { ...controls };
    const inputs = Object.keys(formElements).map((key) => {
      const inputElement = formElements[key];
      return (
        <Input
          key={key}
          elementConfig={inputElement.elementConfig}
          label={inputElement.label}
          value={inputElement.value}
          valid={inputElement.valid}
          onChange={event => this.onInputChange(event, key)}
          touched={inputElement.touched}
        />
      );
    });

    return (
      <Container>
        <h2>Залогиньтесь</h2>
        <hr />
        <form onSubmit={this.onFormSubmit}>
          {inputs}
          <Button color="blue" type="submit" disabled={!formIsValid}>
              Войти
          </Button>
        </form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) => dispatch(login(username, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  onAuth: PropTypes.func.isRequired,
};
