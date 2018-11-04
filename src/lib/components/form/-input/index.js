/* eslint no-underscore-dangle: 0 */
/* eslint-env browser */

import shadowStyles from './shadow.css';

const template = `
    <style>${shadowStyles.toString()}</style>
    <label class="label">
        <span class="tag"></span>
        <span class="result"></span>
        <input/>
    </label>
`;

class FormInput extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    this._initElements();
    this._addHandlers();
  }

  static get observedAttributes() {
    return [
      'name',
      'placeholder',
      'value',
    ];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName !== 'value') {
      this._elements.input[attrName] = newVal;
    } else {
      this._elements.tag.innerHTML = `${newVal}:`;
    }
  }

  _initElements() {
    const hiddenInput = document.createElement('input');
    const result = this.shadowRoot.querySelector('.result');
    const input = this.shadowRoot.querySelector('input');
    const label = this.shadowRoot.querySelector('.label');
    const tag = this.shadowRoot.querySelector('.tag');
    this.appendChild(hiddenInput);

    this._elements = {
      input, label, result, tag, hiddenInput,
    };
  }

  _addHandlers() {
    this._elements.input.addEventListener('input', this._onInput.bind(this));
    this._elements.input.addEventListener('keypress', this._onKeyPress.bind(this));
  }

  _onInput() {
    this._elements.hiddenInput.value = this._elements.input.value;
  }

  _onKeyPress(event) {
    if (event.keyCode === 13) {
      this._elements.result.innerHTML = this._elements.input.value;
      this._elements.input.value = '';
    }
  }
}

customElements.define('form-input', FormInput);
