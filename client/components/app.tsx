import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Joke } from '../types';
import { fetchServerJoke, getRandomTheme } from '../utils';
import { Buttons } from './buttons';
import { Emojis } from './emojis';
import { Jokes } from './jokes';

// For the application to work on both http://localhost/ and http://domain/jokify/
const baseUrl = window.location.pathname.indexOf('/jokify') > -1 ? '/jokify/' : '/';
// If calling the function directly in the useState, it will be called in every render cycle
const initialTheme = getRandomTheme();

// tslint:disable-next-line:variable-name
export const App = () => {
    const [jokes, setJokes] = useState<Joke[]>([]);
    const [jokeIndex, setJokeIndex] = useState(-1);
    const [animationDirection, setAnimationDirection] = useState('slide-left');
    const [filter, setFilter] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [theme, setTheme] = useState(initialTheme);

    const fetchJoke = (id?: Joke['id']) => {
        fetchServerJoke(id, isFilterVisible ? filter : undefined)
            .then(response => {
                setJokes([...jokes, response.data]);
                updateCurrentJoke(jokes.length, response.data.id);
            })
            .catch(() => {});
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
        window.history.pushState({}, document.title, `${baseUrl}${jokeId}`);
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.keyCode === 37) {
            previousJoke();
        } else if (event.keyCode === 39) {
            nextJoke();
        }
    };

    // To be executed only for the first render of the application
    useEffect(() => {
        const parts = window.location.pathname.split('/');
        const id = parseInt(parts[parts.length - 1], 10);
        fetchJoke(id);
        // Set the focus to the viewport to enable the key events
        document.querySelector<HTMLDivElement>('.viewport')!.focus();
    }, []);

    const swipeHandlers = useSwipeable({ onSwipedLeft: nextJoke, onSwipedRight: previousJoke });

    return (
        <div {...swipeHandlers} className={`viewport ${theme}`} tabIndex={0} onKeyDown={onKeyDown}>
            <Jokes
                animationDirection={animationDirection}
                currentIndex={jokeIndex}
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
