import React, { Component } from 'react';
import '../static/image-input.css';

export class ImageInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: '',
			style: '',
			value: ''
		};

		this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);

		this.handleChange = this.handleChange.bind(this);
		this.handleLoad = this.handleLoad.bind(this);
	}

	handleChange(event) {
		const url = URL.createObjectURL(event.target.files[0]);
    this.setState({
			url: url
    });

    console.log(this.value);

    event.preventDefault();
	}

	handleLoad(event) {
		URL.revokeObjectURL(this.state.url)
	}

	handleDrop(event) {
		event.preventDefault();

		this.setState({ style: 'hover' });

		if (typeof (window.FileReader) === 'undefined') {
				console.log('Не поддерживается браузером!');
				this.setState({ style: 'error' });
			return false;
		}

		const file = event.dataTransfer.files[0];

		this.setState({ style: 'drop' });

		const url = URL.createObjectURL(file);
    this.setState({
			url: url
    });

		if (event.dataTransfer.items) {
			event.dataTransfer.items.clear();
		} else {
			event.dataTransfer.clearData();
		}

		return false;
	}

  handleDragOver(event) {
    event.preventDefault();
    this.setState({ style: 'hover' });
		return false;
  }

  handleDragLeave(event) {
    event.preventDefault();
    this.setState({ style: '' });
		return false;
  }

	render() {
		return (
				<div className="px-4">
					<div
							className={ 'AvatarArea row ' + this.state.style }
							onDrop={ this.handleDrop }
							onDragOver={ this.handleDragOver }
							onDragLeave={ this.handleDragLeave}>
						<img
							src={ this.state.url }
							className="AvatarPreview img-thumbnail"
							onLoad={ this.handleLoad }/>
					</div>
					<div className="form-group row my-2">
						<label
							htmlFor={ 'input_' + this.props.name }
							className="col-form-label col-6">
							<b>{ this.props.description }:</b>
						</label>
						<input
							id={ 'input_' + this.props.name }
							name={ this.props.name }
							type="file"
							value={ this.state.value }
							className="form-control-file col-6"
							onChange={ this.handleChange } />
					</div>
        </div>
		);
	}
}
