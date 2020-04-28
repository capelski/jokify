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
            url = `/joke/filtered?$modena=jokify-api&text=${requestData.text}`;
            break;
        default:
        case RequestType.random:
            const nonServedId = getNonServedRandomJokeId(
                requestData.limits.oldest,
                requestData.limits.newest
            );
            url = `/joke/${nonServedId}?$modena=jokify-api`;
            break;
    }

    return axios.get(url);
};

const getNonServedRandomJokeId = (min: number, max: number) => {
    const jokesCount = max - min + 1;
    const servedJokesId = retrieveServedJokesId();

    if (servedJokesId.length >= jokesCount) {
        servedJokesId.length = 0;
    }

    let randomId = getRandomInteger(min, max);
    while (servedJokesId.indexOf(randomId) > -1) {
        randomId = randomId === max ? min : randomId + 1;
    }

    servedJokesId.push(randomId);
    persistServedJokesId(servedJokesId);

    return randomId;
};

const getRandomInteger = (min: number, max: number) =>
    Math.round(Math.random() * (max - min) + min);

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

const localStorageItemId = 'served-jokes-id';

const persistServedJokesId = (servedJokesId: number[]) => {
    try {
        localStorage.setItem(localStorageItemId, servedJokesId.join());
    } catch {
        localStorage.removeItem(localStorageItemId);
    }
};

const retrieveServedJokesId = (): number[] =>
    (localStorage.getItem(localStorageItemId) || '')
        .split(',')
        .map(char => parseInt(char, 10))
        .filter(number => number !== NaN);

export const stallPromise = (promise: Promise<any>, minimumTime = 1000) => {
    const minimumTimePromise = new Promise(resolve => setTimeout(resolve, minimumTime));
    return Promise.all([promise, minimumTimePromise]).then(results => results[0]);
};

const themes = {
    available: ['alpha-theme', 'beta-theme', 'gamma-theme', 'delta-theme'],
    current: ''
};
