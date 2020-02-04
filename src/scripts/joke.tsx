import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Parabolas } from './parabolas';
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
    const [isLeaving, setIsLeaving] = useState(false);
    const [direction, setDirection] = useState('right');

    // To be executed only for the first render of the application
    useEffect(() => {
        props.fetchJoke(history, id ? parseInt(id, 10) : undefined);
    }, []);

    const previousClickHandler = () => {
        setDirection('left');
        setIsLeaving(true);
        setTimeout(() => {
            setIsLeaving(false);
            props.previousJoke(history);
        }, 500);
    };
    const nextClickHandler = () => {
        setDirection('right');
        setIsLeaving(true);
        setTimeout(() => {
            setIsLeaving(false);
            props.nextJoke(history);
        }, 500);
    };

    return props.joke ? (
        <React.Fragment>
            <div
                className={`joke ${direction} ${isLeaving ? 'out' : 'in'}`}
                dangerouslySetInnerHTML={{
                    __html: props.joke.text
                }}
            />
            <div className="buttons">
                <button type="button" className="previous-button" onClick={previousClickHandler}>
                    <span>{'<'}</span>
                </button>

                <button type="button" className="search-button">
                    <span>🔎</span>
                </button>

                <button type="button" className="share-button">
                    <span>🔗</span>
                </button>

                <button type="button" className="next-button" onClick={nextClickHandler}>
                    <span>{'>'}</span>
                </button>
            </div>
            <Parabolas animate={isLeaving} />
        </React.Fragment>
    ) : (
        <div className="joke">Loading...</div>
    );
};
