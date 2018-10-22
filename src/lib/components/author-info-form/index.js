/* eslint no-underscore-dangle: 0 */
/* eslint-env browser */

import shadowStyles from './shadow.css';

const slotName = 'message-input';

const template = `
    <style>${shadowStyles.toString()}</style>
    <form>
        <div class="result"></div>
        <form-input name="email_text" placeholder="Enter email" slot="${slotName}">
            <span slot="icon"></span>
        </form-input>
        <form-input name="first_name_text" placeholder="Enter name" slot="${slotName}">
            <span slot="icon"></span>
        </form-input>
        <form-input name="second_name_text" placeholder="Enter surname" slot="${slotName}">
            <span slot="icon"></span>
        </form-input>
        <form-geoposition></form-geoposition>
        <form-file></form-file>
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
    this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
    // this._elements.inputSlot.addEventListener('slotchange', this._onSlotChange.bind(this));
  }

  _onSubmit(event) {
    this._elements.message.innerText = Array.from(this._elements.form.elements).map(
      el => el.value,
    ).join(', ');
    localStorage.setItem('author_info_value', this._elements.message.innerText);
    event.preventDefault();
    return false;
  }

  _onKeyPress(event) {
    if (event.keyCode === 13) {
      this._elements.form.dispatchEvent(new Event('submit'));
    }
  }
}

customElements.define('author-info-form', AuthorInfoForm);
