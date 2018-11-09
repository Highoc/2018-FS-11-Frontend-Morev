import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ImageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      cursor: '',
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  handleChange(event) {
    const url = URL.createObjectURL(event.target.files[0]);
    this.setState({ url });

    event.preventDefault();
  }

  handleLoad(event) {
    const { url } = this.state;
    URL.revokeObjectURL(url);
  }

  handleDrop(event) {
    event.preventDefault();

    if (typeof (window.FileReader) === 'undefined') {
      console.log('Не поддерживается браузером!');
      return false;
    }

    const file = event.dataTransfer.files[0];
    const url = URL.createObjectURL(file);
    this.setState({ url });

    if (event.dataTransfer.items) {
      event.dataTransfer.items.clear();
    } else {
      event.dataTransfer.clearData();
    }

    return false;
  }

  handleDragOver(event) {
    this.setState({ cursor: 'drag-over' });
    event.preventDefault();
    return false;
  }

  handleDragLeave(event) {
    this.setState({ cursor: 'drag-leave' });
    event.preventDefault();
    return false;
  }

  render() {
    const { url, cursor } = this.state;
    const { name, description } = this.props;

    return (
      <div>
        <div
          onDrop={this.handleDrop}
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
        >
          <img
            alt="Ваш аватар"
            src={url}
            onLoad={this.handleLoad}
          />
        </div>
        <label htmlFor={`id-input-${{ name }}`}>
          <b>
            {description}
            :
          </b>
          <input
            id={`id-input-${{ name }}`}
            name={name}
            type="file"
            onChange={this.handleChange}
          />
          {cursor}
        </label>
      </div>
    );
  }
}

ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
