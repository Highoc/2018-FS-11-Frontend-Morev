/* eslint no-underscore-dangle: 0 */
/* eslint-env browser */

import shadowStyles from './shadow.css';
import getPosition from './geolocation';

const template = `
    <style>${shadowStyles.toString()}</style>
    <div class="result"></div>
    <button>Запросить ваши геоданные</button>
`;

class FormGeoposition extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    this._initElements();
    this._addHandlers();
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this._elements.input[attrName] = newVal;
  }

  _initElements() {
    const button = this.shadowRoot.querySelector('button');
    const div = this.shadowRoot.querySelector('.result');
    this._elements = {
      button, div,
    };
  }

  _addHandlers() {
    this._elements.button.addEventListener('click', () => {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      const promise = getPosition(options);
      promise
        .then(
          (result) => {
            this._elements.div.innerHTML = `(latitude, longtitude): (${result.coords.latitude}, ${result.coords.longitude})`;
          },
          (error) => {
            this._elements.div.innerHTML = `Error ${error}`;
          },
        );
    });
  }
}

customElements.define('form-geoposition', FormGeoposition);
