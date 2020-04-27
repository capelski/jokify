import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Joke, SlideDirection, RequestData, RequestType, Limits, NavigationMode } from '../types';
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
    const [filterText, setFilterText] = useState('');
    const [hasFinishedInitialLoad, setHasFinishedInitialLoad] = useState(false);
    const [jokeIndex, setJokeIndex] = useState(props.initialJoke ? 0 : -1);
    const [jokes, setJokes] = useState<Joke[]>(props.initialJoke ? [props.initialJoke] : []);
    const [limits, setLimits] = useState<Limits>({ newest: -1, oldest: -1 });
    const [navigationMode, setNavigationMode] = useState<NavigationMode>('random');
    const [swipePosition, setSwipePosition] = useState(0);
    const [theme, setTheme] = useState(initialTheme);

    const isNextButtonEnabled =
        navigationMode === 'filtered' ||
        navigationMode === 'random' ||
        (navigationMode === 'sorted' && jokes[jokeIndex] && jokes[jokeIndex].id < limits.newest);

    const isPreviousButtonEnabled =
        ((navigationMode === 'filtered' || navigationMode === 'random') && jokeIndex > 0) ||
        (navigationMode === 'sorted' && jokes[jokeIndex] && jokes[jokeIndex].id > limits.oldest);

    const isNewestButtonEnabled =
        navigationMode === 'sorted' && jokes[jokeIndex] && jokes[jokeIndex].id < limits.newest;
    const isOldestButtonEnabled =
        navigationMode === 'sorted' && jokes[jokeIndex] && jokes[jokeIndex].id > limits.oldest;

    const filterSetter = (newFilter: string) => {
        setFilterText(newFilter);
        resetJokes();
    };

    const fetchJoke = (
        requestData: RequestData,
        { skipThemeChange = false, jokePosition = 'end', clearJokes = false } = {}
    ) =>
        fetchServerJoke(requestData).then(response => {
            if (clearJokes) {
                setJokes([response.data]);
                updateCurrentJoke(0, response.data.id, skipThemeChange);
            } else if (!jokes.some(joke => joke.id === response.data.id)) {
                setJokes(
                    jokePosition === 'start' ? [response.data, ...jokes] : [...jokes, response.data]
                );
                updateCurrentJoke(
                    jokePosition === 'start' ? 0 : jokes.length,
                    response.data.id,
                    skipThemeChange
                );
            }
        });

    const getNewestJoke = () => {
        setAnimationDirection('slide-left');
        fetchJoke({ type: RequestType.newest }, { clearJokes: true }).catch(() => {});
    };

    const getOldestJoke = () => {
        setAnimationDirection('slide-right');
        fetchJoke({ type: RequestType.oldest }, { clearJokes: true }).catch(() => {});
    };

    const navigationModeSetter = (newNavigationMode: NavigationMode) => {
        setNavigationMode(newNavigationMode);
        resetJokes();
    };

    const loadNextJoke = () => {
        setAnimationDirection('slide-left');

        if (jokeIndex < jokes.length - 1) {
            const nextIndex = jokeIndex + 1;
            updateCurrentJoke(nextIndex, jokes[nextIndex].id);
        } else {
            const currentJoke = jokes[jokeIndex];
            const requestData: RequestData =
                navigationMode === 'filtered'
                    ? { type: RequestType.filter, text: filterText }
                    : navigationMode === 'random'
                    ? { type: RequestType.random }
                    : { type: RequestType.id, id: currentJoke.id + 1 };

            fetchJoke(requestData).catch(() => {});
        }
    };

    const loadPreviousJoke = () => {
        setAnimationDirection('slide-right');

        if (jokeIndex > 0) {
            const nextIndex = jokeIndex - 1;
            updateCurrentJoke(nextIndex, jokes[nextIndex].id);
        } else if (navigationMode === 'sorted') {
            const currentJoke = jokes[jokeIndex];
            fetchJoke(
                { type: RequestType.id, id: currentJoke.id - 1 },
                { jokePosition: 'start' }
            ).catch(() => {});
        }
    };

    const resetJokes = () => {
        setJokes(jokes.slice(jokeIndex, jokeIndex + 1));
        setJokeIndex(0);
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
        const requestData: RequestData = props.initialJokeId
            ? { type: RequestType.id, id: props.initialJokeId }
            : { type: RequestType.random };

        const loadingPromises = Promise.all([
            fetchJoke(requestData, { skipThemeChange: true }),
            axios.get('/limits?$modena=jokify-api').then(response => {
                setLimits(response.data);
            })
        ]);

        stallPromise(loadingPromises)
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
            nextJoke={loadNextJoke}
            onSwipe={setSwipePosition}
            previousJoke={loadPreviousJoke}
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
                filterText={filterText}
                getNewestJoke={isNewestButtonEnabled ? getNewestJoke : undefined}
                getOldestJoke={isOldestButtonEnabled ? getOldestJoke : undefined}
                joke={jokes[jokeIndex]}
                loadNextJoke={isNextButtonEnabled ? loadNextJoke : undefined}
                loadPreviousJoke={isPreviousButtonEnabled ? loadPreviousJoke : undefined}
                navigationMode={navigationMode}
                navigator={props.navigator}
                onFilterChange={filterSetter}
                setAreOptionsVisible={setAreOptionsVisible}
                setNavigationMode={navigationModeSetter}
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
