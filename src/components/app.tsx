import React, { useEffect, useState } from 'react';
import { getLimits } from '../jokes-repository';
import { Joke, SlideDirection, RequestData, RequestType, Limits, NavigationMode } from '../types';
import {
    fetchJsonJoke,
    getRandomTheme,
    persistServedJokesId,
    retrieveServedJokesId,
    stallPromise
} from '../utils';
import { Buttons, INavigator } from './buttons';
import { Emojis } from './emojis';
import { InteractionsContainer } from './interactions-container';
import { Jokes } from './jokes';
import { Loader } from './loader';
import { Options } from './options';

export interface AppProps {
    focusDOMElement: () => void;
    initialJoke?: Joke;
    initialJokeId?: number;
    navigator: INavigator;
    updateUrl: (jokeId: number) => void;
}

// Calling the function inside useState, will cause it to be called in every render cycle
const initialTheme = getRandomTheme();

export const App: React.FC<AppProps> = props => {
    const [animationDirection, setAnimationDirection] = useState<SlideDirection>('slide-left');
    const [areOptionsVisible, setAreOptionsVisible] = useState(false);
    const [filterOffset, setFilterOffset] = useState(0);
    const [filterText, setFilterText] = useState('');
    const [hasFinishedInitialLoad, setHasFinishedInitialLoad] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);
    const [jokeIndex, setJokeIndex] = useState(props.initialJoke ? 0 : -1);
    const [jokes, setJokes] = useState<Joke[]>(props.initialJoke ? [props.initialJoke] : []);
    const [limits, setLimits] = useState<Limits>({ newest: -1, oldest: -1 });
    const [navigationMode, setNavigationMode] = useState<NavigationMode>('random');
    const [swipePosition, setSwipePosition] = useState(0);
    const [theme, setTheme] = useState(initialTheme);

    const isLatestJoke = jokeIndex === jokes.length - 1;

    const isNextButtonEnabled =
        (navigationMode === 'filtered' && (!isFiltering || !isLatestJoke)) ||
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
        setFilterOffset(0);
        setFilterText(newFilter);
        setIsFiltering(false);
        resetJokes();
    };

    const fetchJoke = (
        requestData: RequestData,
        { skipThemeChange = false, jokePosition = 'end', clearJokes = false } = {}
    ) =>
        fetchJsonJoke(requestData, limits).then(fetchedJoke => {
            if (clearJokes) {
                setJokes([fetchedJoke]);
                updateCurrentJoke(0, fetchedJoke.id, skipThemeChange);
            } else {
                setJokes(
                    jokePosition === 'start' ? [fetchedJoke, ...jokes] : [...jokes, fetchedJoke]
                );
                updateCurrentJoke(
                    jokePosition === 'start' ? 0 : jokes.length,
                    fetchedJoke.id,
                    skipThemeChange
                );
                if (navigationMode === 'filtered' && fetchedJoke.id !== -1) {
                    setFilterOffset(filterOffset + 1);
                    setIsFiltering(false);
                }
            }

            const servedJokesId = retrieveServedJokesId();
            if (servedJokesId.indexOf(fetchedJoke.id) === -1) {
                servedJokesId.push(fetchedJoke.id);
            }
            persistServedJokesId(servedJokesId);
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

        if (!isLatestJoke) {
            const nextIndex = jokeIndex + 1;
            updateCurrentJoke(nextIndex, jokes[nextIndex].id);
        } else {
            const currentJoke = jokes[jokeIndex];
            const requestData: RequestData =
                navigationMode === 'filtered'
                    ? { type: RequestType.filter, text: filterText, offset: filterOffset }
                    : navigationMode === 'random'
                    ? { type: RequestType.random, limits }
                    : { type: RequestType.id, id: currentJoke.id + 1 };

            if (navigationMode === 'filtered') {
                setIsFiltering(true);
            }

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
        if (jokeId !== -1) {
            props.updateUrl(jokeId);
        }
    };

    // To be executed only for the first render of the application
    useEffect(() => {
        stallPromise(
            getLimits().then(limits => {
                console.log('Limits', limits);
                setLimits(limits);
                const requestData: RequestData = props.initialJokeId
                    ? { type: RequestType.id, id: props.initialJokeId }
                    : { type: RequestType.random, limits };
                return fetchJoke(requestData, { skipThemeChange: true });
            })
        )
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
                isLatestJoke={isLatestJoke}
                joke={jokes[jokeIndex]}
                loadNextJoke={isNextButtonEnabled ? loadNextJoke : undefined}
                loadPreviousJoke={isPreviousButtonEnabled ? loadPreviousJoke : undefined}
                navigator={props.navigator}
                setAreOptionsVisible={setAreOptionsVisible}
            />
            <Options
                filterText={filterText}
                getNewestJoke={isNewestButtonEnabled ? getNewestJoke : undefined}
                getOldestJoke={isOldestButtonEnabled ? getOldestJoke : undefined}
                jokeId={jokes[jokeIndex]?.id}
                navigationMode={navigationMode}
                onFilterChange={filterSetter}
                setNavigationMode={navigationModeSetter}
            />
            <Emojis />

            <Loader />

            {/* Preload the background images so there is no flickering on the first theme load */}
            <div style={{ backgroundImage: 'url("/jokify/images/alpha-bg.png")' }} />
            <div style={{ backgroundImage: 'url("/jokify/images/beta-bg.png")' }} />
            <div style={{ backgroundImage: 'url("/jokify/images/gamma-bg.png")' }} />
            <div style={{ backgroundImage: 'url("/jokify/images/delta-bg.png")' }} />
        </InteractionsContainer>
    );
};
