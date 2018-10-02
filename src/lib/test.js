const say = function (name) {
    window.addEventListener('load', function () {
        var div = document.createElement('div');
            div.innerHTML = `Hello, ${name}`;
            div.style.background='gray';
        document.body.appendChild(div);
    });
}

export default say;
