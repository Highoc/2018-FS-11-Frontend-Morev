/* eslint no-underscore-dangle: 0 */
/* eslint-env browser */

import shadowStyles from './shadow.css';

const template = `
    <style>${shadowStyles.toString()}</style>
    <div class="image-area">
        <img>
    </div>
    <input type="file"/>
`;

class FormFile extends HTMLElement {
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
      'value',
      'disabled',
    ];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this._elements.input[attrName] = newVal;
  }

  _initElements() {
    const input = this.shadowRoot.querySelector('input');
    const image = this.shadowRoot.querySelector('img');
    const imageArea = this.shadowRoot.querySelector('.image-area');
    this._elements = {
      input, image, imageArea,
    };
  }

  _addHandlers() {
    this._elements.input.addEventListener('change', this._onChange.bind(this));
    this._elements.imageArea.addEventListener('drop', this._onDrop.bind(this));
    this._elements.imageArea.addEventListener('dragover', this._onDragOver.bind(this));
    this._elements.imageArea.addEventListener('dragleave', this._onDragLeave.bind(this));
  }

  _onDrop(event) {
    event.preventDefault();

    const dropArea = this._elements.imageArea;
    const img = this._elements.image;

    dropArea.classList.remove('hover');

    if (typeof (window.FileReader) === 'undefined') {
      dropArea.innerHTML = 'Не поддерживается браузером!';
      dropArea.classList.add('error');
      return false;
    }

    const file = event.dataTransfer.files[0];

    dropArea.classList.add('drop');

    const url = URL.createObjectURL(file);
    img.onload = () => URL.revokeObjectURL(url);
    img.src = url;

    if (event.dataTransfer.items) {
      event.dataTransfer.items.clear();
    } else {
      event.dataTransfer.clearData();
    }

    return false;
  }

  _onDragOver(event) {
    event.preventDefault();
    this._elements.imageArea.classList.add('hover');
    return false;
  }

  _onDragLeave(event) {
    event.preventDefault();
    this._elements.imageArea.classList.remove('hover');
    return false;
  }

  _onChange(event) {
    const url = URL.createObjectURL(event.target.files[0]);
    this._elements.image.onload = () => URL.revokeObjectURL(url);
    this._elements.image.src = url;
    return false;
  }
}

customElements.define('form-file', FormFile);
