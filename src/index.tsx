import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { App } from './components/app';
import { INavigator } from './components/buttons';
import './style/main.scss';

// If initial url contains a joke id, we want to load that joke
const pathnameParts = window.location.pathname.split('/').filter(Boolean);
const initialJokeId = parseInt(pathnameParts[pathnameParts.length - 1], 10);

const focusDOMElement = () => {
    document.querySelector<HTMLDivElement>('.app')!.focus();
};

const updateUrl = (jokeId: number) => {
    window.history.pushState({}, document.title, `/jokify/${jokeId}`);
};

const appPlaceholder = document.getElementById('app-placeholder');
Modal.setAppElement(appPlaceholder!);
ReactDOM.render(
    <App
        focusDOMElement={focusDOMElement}
        initialJokeId={initialJokeId}
        navigator={navigator as INavigator}
        updateUrl={updateUrl}
    />,
    appPlaceholder
);
