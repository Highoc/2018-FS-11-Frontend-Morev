import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextInput from './components/TextInput';
import ImageInput from './components/ImageInput';
import GeoInput from './components/GeoInput';

export default class AuthorInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { status: 'wait' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.setState({ status: 'sended' });
    event.preventDefault();
  }

  render() {
    const { action, method, enctype } = this.props;
    const { status } = this.state;
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
