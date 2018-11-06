import React, { Component } from 'react';

import { TextInput } from './components/TextInput';
import { ImageInput } from './components/ImageInput';
import { GeoInput } from './components/GeoInput';

import './static/styles.css'

export class AuthorInfoForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			csrfmiddlewaretoken: this.getCSRFToken(),
			status: statuses.WAIT
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	getCSRFToken() {
		const initGET = {
			method: 'GET'
		};

		const request = new Request('http://localhost:8000/test/');
		fetch(request, initGET)
			.then((resp) => resp.json())
			.then(
			(data) => {
				this.setState({ csrfmiddlewaretoken: data.csrfmiddlewaretoken });
			},
			(reject) => {
				console.log(reject);
			}
		);
	}

	handleSubmit(event) {
		const form = document.forms.AuthorInfoForm;
		let formData = new FormData(form);

		setCookie('csrftoken', this.state.csrfmiddlewaretoken, 10);
		const request = new Request('http://localhost:8000/test/');

		const initPOST = {
			method: 'POST',
			credentials: 'include',
			body: formData,
		};

		this.setState({ status: statuses.LOADING });

		fetch(request, initPOST)
			.then((resp) => resp.json())
			.then(
					(data) => {
						console.log(data);
						this.setState({ status: statuses.SUCCESS });
					},
					(reject) => {
						console.log(reject);
						this.setState({ status: statuses.ERROR });
					});

		event.preventDefault();
	}

	render() {
		return (
			<div className="AuthorInfo container py-4">
				<form
					action={ this.props.action }
					method={ this.props.method }
					encType={ this.props.enctype }
					onSubmit={ this.handleSubmit }
					name="AuthorInfoForm">

					<div className="row">
						<div className="col-md-5">
							<ImageInput
								name="photo"
								description="Выберите ваше фото"/>
						</div>

						<div className="col-md-7">
							<TextInput
								name="name"
								description="Имя"
								placeholder="Введите ваше имя..."/>

							<TextInput
								name="surname"
								description="Фамилия"
								placeholder="Введите вашу фамилию..."/>

							<TextInput
								name="email"
								description="Email"
								placeholder="Введите ваш email..."/>

							<GeoInput
								name="coords"
								description="Ваши координаты"/>

							<input
								type="submit"
								value="Сохранить изменения"/>
						</div>
					</div>
					<div className="row">
						{ this.state.status }
					</div>
					<input type="hidden" name="csrfmiddlewaretoken" value={ this.state.csrfmiddlewaretoken }/>
				</form>
			</div>
		);
	}
}

export default AuthorInfoForm;

function setCookie(cname, cvalue, minutes) {
    var d = new Date();
    d.setTime(d.getTime() + (minutes*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

const statuses = {
		WAIT: 'wait',
		LOADING: 'loading',
		SUCCESS: 'success',
		ERROR: 'error'
};