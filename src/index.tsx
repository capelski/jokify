import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Buttons } from './components/buttons';
import { Emojis } from './components/emojis';
import { Jokes } from './components/jokes';
import { Joke } from './types';
import { fetchServerJoke, getRandomTheme } from './utils';

import './style/main.scss';

// If calling the function directly in the useState, it will be called in every render cycle
const initialTheme = getRandomTheme();

// tslint:disable-next-line:variable-name
const App = () => {
    // For the application to work on both http://localhost/ and http://domain/jokify/
    const [baseUrl] = useState(window.location.pathname.indexOf('/jokify') > -1 ? '/jokify/' : '/');

    const [jokes, setJokes] = useState<Joke[]>([]);
    const [jokeIndex, setJokeIndex] = useState(-1);

    const [animationDirection, setAnimationDirection] = useState('slide-left');
    const [filter, setFilter] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [theme, setTheme] = useState(initialTheme);

    const fetchJoke = (history: any, id?: Joke['id']) => {
        fetchServerJoke(id, isFilterVisible ? filter : undefined).then(response => {
            setJokes([...jokes, response.data]);
            updateCurrentJoke(jokes.length, response.data.id, history);
        });
    };

    const nextJoke = (history: any) => {
        setAnimationDirection('slide-left');

        if (jokeIndex < jokes.length - 1) {
            const nextIndex = jokeIndex + 1;
            updateCurrentJoke(nextIndex, jokes[nextIndex].id, history);
        } else {
            fetchJoke(history);
        }
    };

    const previousJoke = (history: any) => {
        setAnimationDirection('slide-right');

        const nextIndex = Math.max(jokeIndex - 1, 0);
        updateCurrentJoke(nextIndex, jokes[nextIndex].id, history);
    };

    const updateCurrentJoke = (nextIndex: number, jokeId: number, history: any) => {
        setJokeIndex(nextIndex);
        setTheme(getRandomTheme());
        history.push(`${baseUrl}${jokeId}`);
    };

    return (
        <div className={`viewport ${theme}`}>
            <BrowserRouter>
                <Route path={['/jokify/:id', '/jokify', '/:id', '/']}>
                    <Jokes
                        animationDirection={animationDirection}
                        currentIndex={jokeIndex}
                        fetchJoke={fetchJoke}
                        isFilterVisible={isFilterVisible}
                        jokes={jokes}
                    />
                </Route>

                <Buttons
                    isFilterVisible={isFilterVisible}
                    joke={jokes[jokeIndex]}
                    nextJoke={nextJoke}
                    onFilterChange={setFilter}
                    previousJoke={previousJoke}
                    setIsFilterVisible={setIsFilterVisible}
                />
            </BrowserRouter>

            <Emojis />
        </div>
    );
};

ReactDOM.render(<App />, document.body);
