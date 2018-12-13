import React, { Component } from 'react';
import { Button, Container } from 'mdbreact';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../../components/Input/Input';
import valueIsValid from '../../helpers/validationHelpers';
import { backend } from '../../configs/configs';

class TopicAdd extends Component {
  state = {
    formIsValid: false,
    topicAddForm: {
      name: {
        value: '',
        elementConfig: {
          label: 'Название топика',
          type: 'text',
        },
        touched: false,
        valid: false,
        validation: {
          isRequired: true,
        },
      },
      text: {
        value: '',
        elementConfig: {
          label: 'Описание топика',
          type: 'textarea',
          rows: '10',
        },
        touched: false,
        valid: false,
        validation: {
          isRequired: true,
        },
      },
      author_id: {
        value: `${this.props.userId}`,
        elementConfig: {
          type: 'hidden',
        },
        touched: false,
        valid: true,
        validation: {
          isRequired: false,
        },
      },
      categories: {
        value: '',
        elementConfig: {
          label: 'Категории',
          type: 'number',
        },
        touched: false,
        valid: false,
        validation: {
          isRequired: true,
        },
      },
    },
  };

  onInputChange = (event, name) => {
    const { topicAddForm } = this.state;
    const updatedTopicAddForm = {
      ...topicAddForm,
      [name]: {
        ...topicAddForm[name],
        value: event.target.value,
        valid: valueIsValid(event.target.value, topicAddForm[name].validation),
        touched: true,
      },
    };
    const formIsValid = Object
      .keys(updatedTopicAddForm)
      .every(key => updatedTopicAddForm[key].valid);
    this.setState({ topicAddForm: updatedTopicAddForm, formIsValid });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    const { topicAddForm } = this.state;
    const formData = Object.keys(topicAddForm).reduce(
      (res, key) => {
        res[key] = topicAddForm[key].value;
        return res;
      },
      {},
    );
    this.onCreateNewTopic(formData);
  };

  onCreateNewTopic = (topic) => {
    axios.post(`${backend}/topic/add/`, topic)
      .then((result) => {
        console.log('[TopicAdd] Created ', result.data);
      })
      .catch(error => console.log('[TopicAdd] Error ', error));
  };

  render() {
    const { topicAddForm, formIsValid } = this.state;
    const inputs = Object.keys(topicAddForm).map((key) => {
      const inputElement = topicAddForm[key];
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
        <h2>Создайте новый топик</h2>
        <hr />
        <form onSubmit={this.onFormSubmit}>
          {inputs}
          <Button color="blue" disabled={!formIsValid} type="submit">
            Создать
          </Button>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(TopicAdd);

TopicAdd.propTypes = {
  userId: PropTypes.number.isRequired,
};
