import React, { useEffect, useState } from 'react';
import { Joke, SlideDirection, DisplayMode } from '../types';
import { fetchServerJoke, getRandomTheme, stallPromise } from '../utils';
import { Buttons, INavigator } from './buttons';
import { Emojis } from './emojis';
import { InteractionsContainer } from './interactions-container';
import { Jokes } from './jokes';
import { Loader } from './loader';

export interface AppProps {
    focusDOMElement: () => void;
    initialJoke?: Joke;
    initialJokeId?: number;
    navigator: INavigator;
    updateUrl: (jokeId: number) => void;
}

// Calling the function inside useState, will cause it to be called in every render cycle
const initialTheme = getRandomTheme();

// tslint:disable-next-line:variable-name
export const App: React.FC<AppProps> = props => {
    const [animationDirection, setAnimationDirection] = useState<SlideDirection>('slide-left');
    const [areOptionsVisible, setAreOptionsVisible] = useState(false);
    const [displayMode, setDisplayMode] = useState<DisplayMode>('random');
    const [filter, setFilter] = useState('');
    const [hasFinishedInitialLoad, setHasFinishedInitialLoad] = useState(false);
    const [jokeIndex, setJokeIndex] = useState(props.initialJoke ? 0 : -1);
    const [jokes, setJokes] = useState<Joke[]>(props.initialJoke ? [props.initialJoke] : []);
    const [swipePosition, setSwipePosition] = useState(0);
    const [theme, setTheme] = useState(initialTheme);

    const fetchJoke = (id?: Joke['id'], skipThemeChange = false) =>
        fetchServerJoke(id, areOptionsVisible && filter ? filter : undefined).then(response => {
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

    // To be executed only for the first render of the application
    useEffect(() => {
        stallPromise(fetchJoke(props.initialJokeId, true))
            .then(() => {
                setHasFinishedInitialLoad(true);
            })
            .catch(() => {});

        // Set the focus to the app html node to capture the key events
        props.focusDOMElement();
    }, []);

    return (
        <InteractionsContainer
            hasFinishedInitialLoad={hasFinishedInitialLoad}
            nextJoke={nextJoke}
            onSwipe={setSwipePosition}
            previousJoke={previousJoke}
            theme={theme}
        >
            <Jokes
                animationDirection={animationDirection}
                currentIndex={jokeIndex}
                areOptionsVisible={areOptionsVisible}
                jokes={jokes}
                swipePosition={swipePosition}
            />
            <Buttons
                animationDirection={animationDirection}
                areOptionsVisible={areOptionsVisible}
                displayMode={displayMode}
                isFirstJoke={jokeIndex < 1}
                joke={jokes[jokeIndex]}
                navigator={props.navigator}
                nextJoke={nextJoke}
                onFilterChange={setFilter}
                previousJoke={previousJoke}
                setAreOptionsVisible={setAreOptionsVisible}
                setDisplayMode={setDisplayMode}
            />
            <Emojis />

            <Loader />

            {/* Preload the background images so there is no flickering on the first theme load */}
            <div style={{ backgroundImage: 'url("/images/alpha-bg.png?$modena=jokify")' }} />
            <div style={{ backgroundImage: 'url("/images/beta-bg.png?$modena=jokify")' }} />
            <div style={{ backgroundImage: 'url("/images/gamma-bg.png?$modena=jokify")' }} />
            <div style={{ backgroundImage: 'url("/images/delta-bg.png?$modena=jokify")' }} />
        </InteractionsContainer>
    );
};
