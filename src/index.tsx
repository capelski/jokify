import axios from 'axios';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Emojis } from './components/emojis';
import { Jokes } from './components/jokes';
import { Joke } from './types';

import { Buttons } from './components/buttons';
import { Filter } from './components/filter';
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
const themes = ['alpha-theme', 'beta-theme', 'gamma-theme', 'delta-theme'];

// tslint:disable-next-line:variable-name
const App = () => {
    // For the application to work on both http://localhost/ and http://domain/jokify/
    const [baseUrl] = useState(window.location.pathname.indexOf('/jokify') > -1 ? '/jokify/' : '/');

    const [jokes, setJokes] = useState<Joke[]>([]);
    const [jokeIndex, setJokeIndex] = useState(-1);

    const [animationDirection, setAnimationDirection] = useState('slide-left');
    const [filter, setFilter] = useState('');
    const [displayFilter, setDisplayFilter] = useState(false);
    const [areEmojisAnimated, setAreEmojisAnimated] = useState(false);
    const [theme, setTheme] = useState(getRandomTheme());

    const animateEmojis = () => {
        setTheme(getRandomTheme());
        setAreEmojisAnimated(true);
        setTimeout(() => {
            setAreEmojisAnimated(false);
        }, 500);
    };

    const fetchJoke = (history: any, id?: Joke['id']) => {
        fetchServerJoke(id, displayFilter ? filter : undefined).then(response => {
            setJokes([...jokes, response.data]);
            setJokeIndex(jokes.length);
            history.push(`${baseUrl}${response.data.id}`);
        });
    };

    const nextJoke = (history: any) => {
        animateEmojis();
        setAnimationDirection('slide-left');

        if (jokeIndex < jokes.length - 1) {
            const nextIndex = jokeIndex + 1;
            setJokeIndex(nextIndex);
            history.push(`${baseUrl}${jokes[nextIndex].id}`);
        } else {
            fetchJoke(history);
        }
    };

    const previousJoke = (history: any) => {
        animateEmojis();
        setAnimationDirection('slide-right');

        const nextIndex = Math.max(jokeIndex - 1, 0);
        setJokeIndex(nextIndex);
        history.push(`${baseUrl}${jokes[nextIndex].id}`);
    };

    const searchClickHandler = () => {
        setDisplayFilter(!displayFilter);
    };

    return (
        <div className={`viewport ${theme}`}>
            <BrowserRouter>
                <Route path={['/jokify/:id', '/jokify', '/:id', '/']}>
                    <Jokes
                        animationDirection={animationDirection}
                        currentIndex={jokeIndex}
                        fetchJoke={fetchJoke}
                        jokes={jokes}
                    />
                </Route>

                <Buttons
                    nextJoke={nextJoke}
                    previousJoke={previousJoke}
                    searchClickHandler={searchClickHandler}
                />
            </BrowserRouter>

            <Filter isDisplayed={displayFilter} onFilterChange={setFilter} />

            <Emojis animate={areEmojisAnimated} />
        </div>
    );
};

ReactDOM.render(<App />, document.body);
