const themes = ['blue-theme', 'green-theme', 'orange-theme', 'pink-theme', 'red-theme'];
const emojis = ['laugh', 'poo', 'wink-tongue', 'boom', 'bomb', 'tada', 'halloween', 'dice'];

export const insertParabolas = () => {
    for (let i = 1; i <= 50; ++i) {
        const viewport = document.getElementById('viewport')!;
        const span = document.createElement('span');
        span.classList.add('symbol');
        span.classList.add('parabola');
        span.classList.add(`trajectory-${i}`);
        viewport.appendChild(span);
    }
};

export const animateJoke = (node: HTMLElement) => {
    node.classList.remove('animate');
    setTimeout(() => {
        node.classList.add('animate');
    }, 100);
};

export const animateSymbols = () => {
    const symbols = Array.from(document.querySelectorAll('.symbol'));
    symbols.forEach(symbol => {
        DOMTokenList.prototype.remove.apply(symbol.classList, emojis);
        symbol.classList.add(emojis[Math.round(Math.random() * (emojis.length - 1))]);
        symbol.classList.remove('parabola');
        setTimeout(() => {
            symbol.classList.add('parabola');
        }, 100);
    });
};

export const randomColorize = () => {
    const viewport = document.getElementById('viewport')!;
    DOMTokenList.prototype.remove.apply(viewport.classList, themes);
    const nextTheme = themes[Math.round(Math.random() * (themes.length - 1))];
    viewport.classList.add(nextTheme);
};
