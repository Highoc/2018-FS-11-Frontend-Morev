import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getPosition from '../helpers/getPosition';


export default class GeoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {
        latitude: localStorage.getItem('coords-latitude') || '',
        longitude: localStorage.getItem('coords-longitude') || '',
      },
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const promise = getPosition(options);
    promise.then(
      (result) => {
        this.setState({
          coords: {
            latitude: result.coords.latitude,
            longitude: result.coords.longitude,
          },
        });

        localStorage.setItem('coords-latitude', result.coords.latitude);
        localStorage.setItem('coords-longitude', result.coords.longitude);
      },
      (error) => {
        this.setState({
          coords: {
            latitude: null,
            longitude: null,
          },
        });

        localStorage.setItem('coords-latitude', '');
        localStorage.setItem('coords-longitude', '');
      },
    );

    event.preventDefault();
  }

  render() {
    const { name, description } = this.props;
    const { coords } = this.state;

    return (
      <div className="row pt-1">
        <div className="col">
          <b>
            {description}
            :
          </b>
          <input
            type="button"
            onClick={this.handleClick}
            value="Запросить ваше местоположение"
            className="btn btn-primary"
          />
        </div>
        <div className="col form-group">
          <label htmlFor={`id-input-${name}-latitude`}>
            Широта:
            <input
              id={`id-input-${name}-latitude`}
              type="text"
              name={`${name}-latitude`}
              value={coords.latitude}
              readOnly
              className="form-control"
            />
          </label>
        </div>
        <div className="col form-group">
          <label htmlFor={`id-input-${name}-longitude`}>
            Долгота:
            <input
              id={`id-input-${name}-longitude`}
              type="text"
              name={`${name}-longitude`}
              value={coords.longitude}
              readOnly
              className="form-control"
            />
          </label>
        </div>
      </div>
    );
  }
}

GeoInput.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
