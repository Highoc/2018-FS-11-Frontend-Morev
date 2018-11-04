/* eslint no-underscore-dangle: 0 */
/* eslint-env browser */

import shadowStyles from './shadow.css';

const template = `
    <style>${shadowStyles.toString()}</style>
    <form>
        <div class="result"></div>
        <form-input name="first_name" placeholder="Enter name" value="First name"></form-input>
        <form-input name="second_name" placeholder="Enter surname" value="Second name"></form-input>
        <form-input name="email" placeholder="Enter email" value="Email"></form-input>
        <form-geoposition></form-geoposition>
        <form-file></form-file>
        <input type="submit" value="Сохранить"/>
    </form>
`;

class AuthorInfoForm extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    this._initElements();
    this._addHandlers();
  }

  static get observedAttributes() {
    return [
      'action',
      'method',
    ];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this._elements.form[attrName] = newVal;
  }

  _initElements() {
    const form = this.shadowRoot.querySelector('form');
    const message = this.shadowRoot.querySelector('.result');
    message.innerHTML = localStorage.getItem('author_info_value');
    this._elements = {
      form,
      message,
    };
  }

  _addHandlers() {
    this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
  }

  _onSubmit(event) {
    let formdata = new FormData();

    this._elements.message.innerText = Array.from(this._elements.form.elements).map(
      el => el.value,
    ).join(', ');
    localStorage.setItem('author_info_value', this._elements.message.innerText);

    event.preventDefault();
    return false;
  }
}

customElements.define('author-info-form', AuthorInfoForm);
