const viewport = document.getElementById('viewport');
const themes = ['blue-theme', 'green-theme', 'orange-theme', 'pink-theme', 'red-theme'];
const emojis = ['laugh', 'poo', 'wink-tongue', 'boom', 'bomb', 'tada', 'halloween', 'dice'];

// Insert the 50 parabola HTML nodes on page load
for (let i = 1; i <= 50; ++i) {
    const span = document.createElement('span');
    span.classList.add('symbol');
    span.classList.add('parabola');
    span.classList.add(`trajectory-${i}`);
    viewport.appendChild(span);
}

function animateJoke(node) {
    node.classList.remove('animate');
    setTimeout(() => {
        node.classList.add('animate');
    }, 100);
}

function animateSymbols() {
    const symbols = Array.from(document.querySelectorAll('.symbol'));
    symbols.forEach(symbol => {
        DOMTokenList.prototype.remove.apply(symbol.classList, emojis);
        symbol.classList.add(emojis[Math.round(Math.random() * (emojis.length - 1))]);
        symbol.classList.remove('parabola');
        setTimeout(() => {
            symbol.classList.add('parabola');
        }, 100);
    });
}

function randomColorize() {
    DOMTokenList.prototype.remove.apply(viewport.classList, themes);
    var nextTheme = themes[Math.round(Math.random() * (themes.length - 1))];
    viewport.classList.add(nextTheme);
}
