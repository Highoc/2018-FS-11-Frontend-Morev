const say = function (name) {
    window.addEventListener('load', function () {
        const div = document.createElement('div');
              div.innerHTML = `Hello, ${name}`;
              div.className = 'myDiv';
        document.body.appendChild(div);
    });
}

export default say;
