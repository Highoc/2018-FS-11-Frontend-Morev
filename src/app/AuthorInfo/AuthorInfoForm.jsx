import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import TextInput from './components/TextInput';
import ImageInput from './components/ImageInput';
import GeoInput from './components/GeoInput';

import './static/styles/AuthorInfo.css';
import { backend } from '../../configs/configs';

export default class AuthorInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: statuses.READY,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { status } = this.state;
    const { action } = this.props;

    if (status !== statuses.READY) {
      event.preventDefault();
      return false;
    }

    const form = document.forms.AuthorInfoForm;
    const formData = new FormData(form);


    this.setState({ status: statuses.LOADING });

    axios.post(`${backend}/${action}/`, formData)
      .then((result) => {
        console.log(`[AuthorInfo] Status code: ${result.status}`);
        this.setState({ status: statuses.SUCCESS });
      })
      .catch((error) => {
        this.setState({ status: statuses.ERROR });
        console.log(`[AuthorInfo] Error: ${error}`);
      });

    event.preventDefault();
    return false;
  }

  render() {
    const { action, method, enctype } = this.props;
    const { status } = this.state;
    return (
      <div className="AuthorInfo px-5 pt-5">
        <h2>Ваши данные</h2>
        <hr />
        <form
          action={action}
          method={method}
          encType={enctype}
          onSubmit={this.handleSubmit}
          name="AuthorInfoForm"
        >
          <div className="row">
            <div className="col-md-5">
              <ImageInput
                name="photo"
                description="Выберите ваше фото"
              />
            </div>

            <div className="col-md-7">
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
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <h3>
                Статус отправки:
                {` ${status}`}
              </h3>
            </div>
            <div>
              <input
                type="submit"
                value="Сохранить изменения"
                className="btn btn-primary float-right mx-3"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

AuthorInfoForm.propTypes = {
  action: PropTypes.string,
  method: PropTypes.string,
  enctype: PropTypes.string,
};

AuthorInfoForm.defaultProps = {
  action: 'profile',
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
