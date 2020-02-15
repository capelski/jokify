import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useHistory } from 'react-router-dom';
import { Buttons } from './components/buttons';
import { Emojis } from './components/emojis';
import { Jokes } from './components/jokes';
import { Joke } from './types';
import { fetchServerJoke, getRandomTheme } from './utils';

import './style/main.scss';

// If calling the function directly in the useState, it will be called in every render cycle
const initialTheme = getRandomTheme();

// tslint:disable-next-line:variable-name
const AppWithHistory = () => {
    const history = useHistory();

    // For the application to work on both http://localhost/ and http://domain/jokify/
    const [baseUrl] = useState(window.location.pathname.indexOf('/jokify') > -1 ? '/jokify/' : '/');

    const [jokes, setJokes] = useState<Joke[]>([]);
    const [jokeIndex, setJokeIndex] = useState(-1);

    const [animationDirection, setAnimationDirection] = useState('slide-left');
    const [filter, setFilter] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [theme, setTheme] = useState(initialTheme);

    const fetchJoke = (id?: Joke['id']) => {
        fetchServerJoke(id, isFilterVisible ? filter : undefined).then(response => {
            setJokes([...jokes, response.data]);
            updateCurrentJoke(jokes.length, response.data.id);
        });
    };

    const nextJoke = () => {
        setAnimationDirection('slide-left');

        if (jokeIndex < jokes.length - 1) {
            const nextIndex = jokeIndex + 1;
            updateCurrentJoke(nextIndex, jokes[nextIndex].id);
        } else {
            fetchJoke();
        }
    };

    const previousJoke = () => {
        setAnimationDirection('slide-right');

        const nextIndex = Math.max(jokeIndex - 1, 0);
        updateCurrentJoke(nextIndex, jokes[nextIndex].id);
    };

    const updateCurrentJoke = (nextIndex: number, jokeId: number) => {
        setJokeIndex(nextIndex);
        setTheme(getRandomTheme());
        history.push(`${baseUrl}${jokeId}`);
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.keyCode === 37) {
            previousJoke();
        } else if (event.keyCode === 39) {
            nextJoke();
        }
    };

    useEffect(() => {
        // Set the focus to the viewport to enable the key events
        document.querySelector<HTMLDivElement>('.viewport')!.focus();
    }, []);

    return (
        <div className={`viewport ${theme}`} tabIndex={0} onKeyDown={onKeyDown}>
            <Jokes
                animationDirection={animationDirection}
                currentIndex={jokeIndex}
                fetchJoke={fetchJoke}
                isFilterVisible={isFilterVisible}
                jokes={jokes}
            />
            <Buttons
                isFilterVisible={isFilterVisible}
                joke={jokes[jokeIndex]}
                nextJoke={nextJoke}
                onFilterChange={setFilter}
                previousJoke={previousJoke}
                setIsFilterVisible={setIsFilterVisible}
            />
            <Emojis />

            {/* Preload the background images so there is no flickering on the first theme load */}
            <div style={{ backgroundImage: 'url("/images/alpha-bg.png?$modena=jokify")' }} />
            <div style={{ backgroundImage: 'url("/images/beta-bg.png?$modena=jokify")' }} />
            <div style={{ backgroundImage: 'url("/images/gamma-bg.png?$modena=jokify")' }} />
            <div style={{ backgroundImage: 'url("/images/delta-bg.png?$modena=jokify")' }} />
        </div>
    );
};

// tslint:disable-next-line:variable-name
const App = () => (
    <BrowserRouter>
        <AppWithHistory />
    </BrowserRouter>
);

ReactDOM.render(<App />, document.body);
