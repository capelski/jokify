import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app';

import './style/main.scss';

// For the application to work on both http://localhost/ and http://domain/jokify/
const baseUrl = window.location.pathname.indexOf('/jokify') > -1 ? '/jokify/' : '/';

// If initial url contains a joke id, we want to load that joke
const pathnameParts = window.location.pathname.split('/');
const initialJokeId = parseInt(pathnameParts[pathnameParts.length - 1], 10);

const focusViewport = () => {
    document.querySelector<HTMLDivElement>('.viewport')!.focus();
};

const updateUrl = (jokeId: number) => {
    window.history.pushState({}, document.title, `${baseUrl}${jokeId}`);
};

const appPlaceholder = document.getElementById('app-placeholder');
ReactDOM.render(
    <App
        browserShare={(navigator as any).share}
        focusViewport={focusViewport}
        initialJokeId={initialJokeId}
        updateUrl={updateUrl}
    />,
    appPlaceholder
);
