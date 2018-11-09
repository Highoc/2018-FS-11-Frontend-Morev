import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextInput from './components/TextInput';
import ImageInput from './components/ImageInput';
import GeoInput from './components/GeoInput';

import getCSRFToken from './helpers/getCSRFToken';
import setCookie from './helpers/setCookie';

export default class AuthorInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: statuses.WAIT,
      csrfmiddlewaretoken: '',
    };

    const token = getCSRFToken();
    token.then(
      (data) => {
        this.setState({
          status: statuses.READY,
          csrfmiddlewaretoken: data.csrfmiddlewaretoken,
        });
      },
      (reject) => {
        console.log(reject);
        this.setState({ status: statuses.ERROR });
      },
    );

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { status, csrfmiddlewaretoken } = this.state;
    const { action } = this.props;

    if (status !== statuses.READY) {
      event.preventDefault();
      return false;
    }

    const form = document.forms.AuthorInfoForm;
    const formData = new FormData(form);

    setCookie('csrftoken', csrfmiddlewaretoken, 10);

    const request = new Request(`http://localhost:8000/${action}/`);
    const initPOST = {
      method: 'POST',
      credentials: 'include',
      body: formData,
    };

    this.setState({ status: statuses.LOADING });
    fetch(request, initPOST)
      .then(resp => resp.json())
      .then(
        (data) => {
          this.setState({ status: statuses.SUCCESS });
        },
        (reject) => {
          this.setState({ status: statuses.ERROR });
        },
      );

    event.preventDefault();
    return false;
  }

  render() {
    const { action, method, enctype } = this.props;
    const { status, csrfmiddlewaretoken } = this.state;
    return (
      <form
        action={action}
        method={method}
        encType={enctype}
        onSubmit={this.handleSubmit}
        name="AuthorInfoForm"
      >

        <ImageInput
          name="photo"
          description="Выберите ваше фото"
        />

        <TextInput
          name="name"
          description="Имя"
          placeholder="Введите ваше имя..."
        />

        <TextInput
          name="surname"
          description="Фамилия"
          placeholder="Введите вашу фамилию..."
        />

        <TextInput
          name="email"
          description="Email"
          placeholder="Введите ваш email..."
        />

        <GeoInput
          name="coords"
          description="Ваши координаты"
        />

        {status}

        <input
          type="submit"
          value="Сохранить изменения"
        />

        <input type="hidden" name="csrfmiddlewaretoken" value={csrfmiddlewaretoken} />
      </form>
    );
  }
}

AuthorInfoForm.propTypes = {
  action: PropTypes.string.isRequired,
  method: PropTypes.string,
  enctype: PropTypes.string,
};

AuthorInfoForm.defaultProps = {
  method: 'post',
  enctype: 'multipart/form-data',
};

const statuses = {
  WAIT: 'wait',
  READY: 'ready',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};
