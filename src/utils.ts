import axios from 'axios';

export const fetchServerJoke = (id?: number, filter?: string) => {
    const url = id
        ? `/joke/${id}?$modena=jokify-api`
        : filter
        ? `/joke?filter=${filter}&$modena=jokify-api`
        : `/joke?$modena=jokify-api`;

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
    console.log(themes);
    return nextTheme;
};
