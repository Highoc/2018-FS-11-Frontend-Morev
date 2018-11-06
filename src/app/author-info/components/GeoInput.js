import React, { Component } from 'react';


export class GeoInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			coords: {
				latitude: undefined,
				longitude: undefined
			}
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
  }

  handleClick(event) {
		console.log("+_");
		const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

		const promise = getPosition(options);
		promise.then(
				(result) => {
					this.setState(
							{ coords:
								{
									latitude: result.coords.latitude,
									longitude: result.coords.longitude
								}
							});
				},
				(error) => {
					this.setState(
							{ coords:
								{
									latitude: null,
									longitude: null
								}
							});
				},
		);

		event.preventDefault()
	}

	render() {
		return (
				<div className="row my-2">
					<div className="col">
						<div className="row my-2"><b>{ this.props.description }:</b></div>
						<div className="row my-2">
							<div className="col-4">
								<label className="row" htmlFor={ this.props.name + '-latitude' }>Широта</label>
                <label className="row" htmlFor={ this.props.name + '-longitude' }>Долгота</label>
							</div>
							<div className="col-8">
								<input
									id={ this.props.name + '-latitude' }
									type="text"
									name={ this.props.name + '-latitude' }
									value={ this.state.coords.latitude }
									readOnly
								/>
								<input
									id={ this.props.name + '-longitude' }
									type="text"
									name={ this.props.name + '-longitude' }
									value={ this.state.coords.longitude }
									readOnly
								/>
							</div>
						</div>
						<div className="row my-2">
							<input
								type="button"
								onClick={ this.handleClick }
								value="Запросить ваше местоположение" />
						</div>
					</div>
        </div>
		);
	}
}


function getPosition(options) {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(error);
      },
      options,
    );
  });
}
