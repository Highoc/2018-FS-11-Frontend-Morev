import React, { Component } from 'react';

export class TextInput extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
  }

	render() {
		return (
		    <div className="form-group row my-2">
					<div className="col col-form-label">
						<label htmlFor={ 'input' + this.props.name }>
							<b>{ this.props.description }:</b>
						</label>
					</div>
					<div className="col">
						<span>{ this.state.value }</span>
					</div>
					<div className="col">
						<input
							id={ 'input' + this.props.name }
              name={ this.props.name }
              type="text"
              placeholder={ this.props.placeholder }
              value={ this.state.value }
              onChange={ this.handleChange } />
					</div>
        </div>
		);
	}
}