import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Container, Button } from 'mdbreact';

import Input from '../../components/Input/Input';
import { registration } from '../../store/actions/registration';

import valueIsValid from '../../helpers/validationHelpers';

class Registration extends Component {
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
      email: {
        value: '',
        elementConfig: {
          label: 'Ваш email',
          type: 'email',
        },
        touched: false,
        valid: false,
        validation: {
          required: false,
        },
      },
      password1: {
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
      password2: {
        value: '',
        elementConfig: {
          label: 'Повторите пароль',
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
    const { onRegister } = this.props;
    const { controls } = this.state;
    const data = {
      username: controls.username.value,
      email: controls.email.value,
      password1: controls.password1.value,
      password2: controls.password2.value,
    };
    onRegister(data);
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
        <h2>Зарегистрируйтесь</h2>
        <hr />
        <form onSubmit={this.onFormSubmit}>
          {inputs}
          <Button color="blue" type="submit" disabled={!formIsValid}>
              Зарегистрироваться
          </Button>
        </form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: data => dispatch(registration(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.reg.loading,
    error: state.reg.error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);

Registration.propTypes = {
  onRegister: PropTypes.func.isRequired,
};
