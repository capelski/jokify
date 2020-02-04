import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Joke } from './types';

interface JokeProps {
    fetchJoke: (history: any, id?: Joke['id']) => void;
    joke?: Joke;
    nextJoke: (history: any) => void;
    previousJoke: (history: any) => void;
}

// tslint:disable-next-line:variable-name
export const JokeComponent = (props: JokeProps) => {
    const history = useHistory();
    const { id } = useParams();

    // To be executed only for the first render of the application
    useEffect(() => {
        props.fetchJoke(history, id ? parseInt(id, 10) : undefined);
    }, []);

    const previousClickHandler = () => props.previousJoke(history);
    const nextClickHandler = () => props.nextJoke(history);

    return props.joke ? (
        <React.Fragment>
            <button type="button" onClick={previousClickHandler}>
                <span>Previous</span>
            </button>

            <button type="button" onClick={nextClickHandler}>
                <span>Next</span>
            </button>

            <div
                className="joke"
                dangerouslySetInnerHTML={{
                    __html: props.joke.text
                }}
            />
        </React.Fragment>
    ) : (
        <h1>Loading...</h1>
    );
};
