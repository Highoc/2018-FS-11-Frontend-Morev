import React, { Component } from 'react';

import { Container, Button } from 'mdbreact';
import axios from 'axios';

import Input from '../../components/Input/Input';
import valueIsValid from '../../helpers/validationHelpers';
import { backend } from '../../configs/configs';

export default class FeedbackContainer extends Component {
  state = {
    formIsValid: false,
    feedbackForm: {
      username: {
        value: '',
        elementConfig: {
          label: 'Имя',
          type: 'text',
        },
        touched: false,
        valid: false,
        validation: {
          isRequired: true,
        },
      },
      issue: {
        value: '',
        elementConfig: {
          label: 'Тема',
          type: 'text',
        },
        touched: false,
        valid: false,
        validation: {
          isRequired: true,
          minLength: 10,
          maxLength: 100,
        },
      },
      description: {
        value: '',
        elementConfig: {
          label: 'Описание проблемы',
          type: 'textarea',
          rows: '10',
        },
        touched: false,
        valid: false,
        validation: {
          isRequired: true,
          minLength: 10,
          maxLength: 1000,
        },
      },
    },
  };

  onInputChange = (event, name) => {
    const { feedbackForm } = this.state;

    const updatedForm = {
      ...feedbackForm,
    };

    const updatedInput = {
      ...updatedForm[name],
    };

    updatedInput.touched = true;
    updatedInput.value = event.target.value;
    updatedInput.valid = valueIsValid(updatedInput.value, updatedInput.validation);

    updatedForm[name] = updatedInput;

    const formIsValid = Object.keys(updatedForm).every(key => updatedForm[key].valid);

    this.setState({
      feedbackForm: updatedForm,
      formIsValid,
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    const { feedbackForm } = this.state;
    const formData = Object.keys(feedbackForm).reduce(
      (res, key) => {
        res[key] = feedbackForm[key].value;
        return res;
      },
      {},
    );

    axios.post(`${backend}/feedback/`, formData)
      .then((result) => {
        console.log(`[FeedbackContainer] Status code: ${result.status}`);
      })
      .catch((error) => {
        console.log(`[FeedbackContainer] Error: ${error}`);
      });
  };

  render() {
    const { feedbackForm, formIsValid } = this.state;
    const inputs = Object.keys(feedbackForm).map((key) => {
      const inputElement = feedbackForm[key];
      return (
        <Input
          key={key}
          elementConfig={inputElement.elementConfig}
          label={inputElement.label}
          value={inputElement.value}
          onChange={event => this.onInputChange(event, key)}
          touched={inputElement.touched}
          valid={inputElement.valid}
        />
      );
    });

    return (
      <Container>
        <h2>Оставьте фидбэк</h2>
        <hr />
        <form onSubmit={this.onFormSubmit}>
          {inputs}
          <Button color="blue" disabled={!formIsValid} type="submit">
            Отправить
          </Button>
        </form>
      </Container>
    );
  }
}
