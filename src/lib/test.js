/* eslint-env browser */

const say = (name) => {
  window.addEventListener('load', () => {
    const div = document.createElement('div');
    div.innerHTML = `Hello, ${name}`;
    div.className = 'myDiv';
    document.body.appendChild(div);
  });
};

export default say;
