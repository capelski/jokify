import { getJokeById, getMatchingJoke } from './jokes-repository';
import { Limits, RequestData, RequestType } from './types';

declare var localStorage: {
    getItem: (itemId: string) => string;
    removeItem: (itemId: string) => void;
    setItem: (itemId: string, itemValue: string) => void;
};

export const fetchJsonJoke = (requestData: RequestData, limits: Limits) => {
    if (requestData.type === RequestType.id) {
        return getJokeById(requestData.id);
    } else if (requestData.type === RequestType.oldest) {
        return getJokeById(limits.oldest);
    } else if (requestData.type === RequestType.newest) {
        return getJokeById(limits.newest);
    } else if (requestData.type === RequestType.filter) {
        return getMatchingJoke(requestData.text, 0);
    } else {
        const nonServedId = getNonServedRandomJokeId(
            requestData.limits.oldest,
            requestData.limits.newest
        );
        return getJokeById(nonServedId);
    }
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

export const persistServedJokesId = (servedJokesId: number[]) => {
    try {
        localStorage.setItem(localStorageItemId, servedJokesId.join());
    } catch {
        localStorage.removeItem(localStorageItemId);
    }
};

export const retrieveServedJokesId = (): number[] =>
    (localStorage.getItem(localStorageItemId) || '')
        .split(',')
        .map(char => parseInt(char, 10))
        .filter(number => !isNaN(number));

export const stallPromise = (promise: Promise<any>, minimumTime = 1000) => {
    const minimumTimePromise = new Promise(resolve => setTimeout(resolve, minimumTime));
    return Promise.all([promise, minimumTimePromise]).then(results => results[0]);
};

const themes = {
    available: ['alpha-theme', 'beta-theme', 'gamma-theme', 'delta-theme'],
    current: ''
};
