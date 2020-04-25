import axios from 'axios';

export const fetchServerJoke = (id?: number, text?: string) => {
    const url = id
        ? `/joke/${id}?$modena=jokify-api`
        : text
        ? `/joke/filter?text=${text}&$modena=jokify-api`
        : `/joke/random?$modena=jokify-api`;

    return axios.get(url);
};

const themes = {
    available: ['alpha-theme', 'beta-theme', 'gamma-theme', 'delta-theme'],
    current: ''
};

export const getRandomTheme = () => {
    const nextThemeIndex = Math.round(Math.random() * (themes.available.length - 1));
    const nextTheme = themes.available[nextThemeIndex];

    themes.available.splice(nextThemeIndex, 1);
    if (themes.current) {
        themes.available.push(themes.current);
    }
    themes.current = nextTheme;

    return nextTheme;
};

export const stallPromise = (promise: Promise<any>, minimumTime = 1000) => {
    const minimumTimePromise = new Promise(resolve => setTimeout(resolve, minimumTime));
    return Promise.all([promise, minimumTimePromise]).then(results => results[0]);
};
