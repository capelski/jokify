import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Joke, SlideDirection } from '../types';
import { fetchServerJoke, getRandomTheme, stallPromise } from '../utils';
import { Buttons } from './buttons';
import { Emojis } from './emojis';
import { Jokes } from './jokes';
import { Loader } from './loader';

export interface AppProps {
    browserShare?: (...args: any[]) => void;
    focusViewport: () => void;
    updateUrl: (jokeId: number) => void;
    initialJokeId?: number;
    initialJoke?: Joke;
}

// Calling the function inside useState, will cause it to be called in every render cycle
const initialTheme = getRandomTheme();

// tslint:disable-next-line:variable-name
export const App: React.FC<AppProps> = props => {
    const [hasFinishedInitialLoad, setHasFinishedInitialLoad] = useState(false);
    const [jokes, setJokes] = useState<Joke[]>(props.initialJoke ? [props.initialJoke] : []);
    const [jokeIndex, setJokeIndex] = useState(props.initialJoke ? 0 : -1);
    const [animationDirection, setAnimationDirection] = useState<SlideDirection>('slide-left');
    const [filter, setFilter] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [swipePosition, setSwipePosition] = useState(0);
    const [theme, setTheme] = useState(initialTheme);

    const fetchJoke = (id?: Joke['id'], skipThemeChange = false) =>
        fetchServerJoke(id, isFilterVisible ? filter : undefined).then(response => {
            setJokes([...jokes, response.data]);
            updateCurrentJoke(jokes.length, response.data.id, skipThemeChange);
        });

    const nextJoke = () => {
        setAnimationDirection('slide-left');

        if (jokeIndex < jokes.length - 1) {
            const nextIndex = jokeIndex + 1;
            updateCurrentJoke(nextIndex, jokes[nextIndex].id);
        } else {
            fetchJoke().catch(() => {});
        }
    };

    const previousJoke = () => {
        setAnimationDirection('slide-right');

        const nextIndex = Math.max(jokeIndex - 1, 0);
        updateCurrentJoke(nextIndex, jokes[nextIndex].id);
    };

    const updateCurrentJoke = (nextIndex: number, jokeId: number, skipThemeChange = false) => {
        setJokeIndex(nextIndex);
        if (!skipThemeChange) {
            setTheme(getRandomTheme());
        }
        props.updateUrl(jokeId);
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
        stallPromise(fetchJoke(props.initialJokeId, true))
            .then(() => {
                setHasFinishedInitialLoad(true);
            })
            .catch(() => {});

        // Set the focus to the viewport to enable the key events
        props.focusViewport();
    }, []);

    const swipeHandlers = useSwipeable({
        onSwipedLeft(eventData) {
            setTimeout(() => setSwipePosition(0), 500);
            if (Math.abs(eventData.deltaX) > 80) {
                nextJoke();
            }
        },
        onSwipedRight(eventData) {
            setTimeout(() => setSwipePosition(0), 500);
            if (Math.abs(eventData.deltaX) > 80) {
                previousJoke();
            }
        },
        onSwiping(eventData) {
            if (Math.abs(eventData.deltaX) > 40) {
                setSwipePosition(eventData.deltaX);
            }
        }
    });

    // TODO Rename viewport to app
    return (
        <div
            {...swipeHandlers}
            className={`viewport ${theme}${
                hasFinishedInitialLoad ? ' has-finished-initial-load' : ''
            }`}
            tabIndex={0}
            onKeyDown={onKeyDown}
        >
            <Jokes
                animationDirection={animationDirection}
                currentIndex={jokeIndex}
                isFilterVisible={isFilterVisible}
                jokes={jokes}
                swipePosition={swipePosition}
            />
            <Buttons
                animationDirection={animationDirection}
                browserShare={props.browserShare}
                isFilterVisible={isFilterVisible}
                joke={jokes[jokeIndex]}
                nextJoke={nextJoke}
                onFilterChange={setFilter}
                previousJoke={previousJoke}
                setIsFilterVisible={setIsFilterVisible}
            />
            <Emojis />

            <Loader />

            {/* Preload the background images so there is no flickering on the first theme load */}
            <div style={{ backgroundImage: 'url("/images/alpha-bg.png?$modena=jokify")' }} />
            <div style={{ backgroundImage: 'url("/images/beta-bg.png?$modena=jokify")' }} />
            <div style={{ backgroundImage: 'url("/images/gamma-bg.png?$modena=jokify")' }} />
            <div style={{ backgroundImage: 'url("/images/delta-bg.png?$modena=jokify")' }} />
        </div>
    );
};
