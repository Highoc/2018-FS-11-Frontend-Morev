import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: localStorage.getItem(props.name) || '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name } = this.props;
    this.setState({ value: event.target.value });
    localStorage.setItem(name, event.target.value);
  }

  render() {
    const { name, description, placeholder } = this.props;
    const { value } = this.state;
    return (
      <div className="form-group pt-1">
        <label htmlFor={`id-input-${name}`}>
          <b>
            {description}
            :
          </b>
          {` ${value}`}
          <input
            id={`id-input-${name}`}
            name={name}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={this.handleChange}
            className="form-control"
          />
        </label>
      </div>
    );
  }
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
