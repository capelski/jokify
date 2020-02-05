import axios from 'axios';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { JokeComponent } from './components/joke';
import { Joke } from './types';

import './style/main.scss';

// TODO Allow setting the api Url
const fetchServerJoke = (id?: number, filter?: string) => {
    const url = id
        ? `/joke/${id}?$modena=jokify-api`
        : filter
        ? `/joke?filter=${filter}&$modena=jokify-api`
        : `/joke?$modena=jokify-api`;

    return axios.get(url);
};
const getRandomTheme = () => themes[Math.round(Math.random() * (themes.length - 1))];
const themes = ['blue-theme', 'green-theme', 'orange-theme', 'pink-theme', 'red-theme'];

// tslint:disable-next-line:variable-name
const App = () => {
    const [jokes, setJokes] = useState<Joke[]>([]);
    const [jokeIndex, setJokeIndex] = useState(-1);
    // For the application to work on both http://localhost and http://domain/jokify
    const [baseUrl] = useState(window.location.pathname.indexOf('/jokify') > -1 ? '/jokify/' : '/');
    const currentJoke = jokes[jokeIndex];

    const nextJoke = (history: any, filter?: string) => {
        if (jokeIndex < jokes.length - 1) {
            const nextIndex = jokeIndex + 1;
            setJokeIndex(nextIndex);
            history.push(`${baseUrl}${jokes[nextIndex].id}`);
        } else {
            fetchJoke(history, undefined, filter);
        }
    };

    const previousJoke = (history: any) => {
        const nextIndex = Math.max(jokeIndex - 1, 0);
        setJokeIndex(nextIndex);
        history.push(`${baseUrl}${jokes[nextIndex].id}`);
    };

    const fetchJoke = (history: any, id?: Joke['id'], filter?: string) => {
        fetchServerJoke(id, filter).then(response => {
            setJokes([...jokes, response.data]);
            setJokeIndex(jokes.length);
            history.push(`${baseUrl}${response.data.id}`);
        });
    };

    return (
        <div className={`fixed-viewport ${getRandomTheme()}`}>
            <BrowserRouter>
                <Route path={['/jokify/:id', '/jokify', '/:id', '/']}>
                    <JokeComponent
                        joke={currentJoke}
                        fetchJoke={fetchJoke}
                        nextJoke={nextJoke}
                        previousJoke={previousJoke}
                    />
                </Route>
            </BrowserRouter>
        </div>
    );
};

ReactDOM.render(<App />, document.body);
