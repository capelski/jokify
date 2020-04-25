import axios from 'axios';
import { RequestData, RequestType } from './types';

export const fetchServerJoke = (requestData: RequestData) => {
    let url;
    switch (requestData.type) {
        case RequestType.id:
            url = `/joke/${requestData.id}?$modena=jokify-api`;
            break;
        case RequestType.oldest:
            url = '/joke/oldest?$modena=jokify-api';
            break;
        case RequestType.newest:
            url = '/joke/newest?$modena=jokify-api';
            break;
        case RequestType.filter:
            url = `/joke/filter?$modena=jokify-api&text=${requestData.text}`;
            break;
        default:
        case RequestType.random:
            url = '/joke/random?$modena=jokify-api';
            break;
    }

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
