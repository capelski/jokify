import React from 'react';
import { useHistory } from 'react-router-dom';
import { Joke } from '../types';

interface ButtonsProps {
    joke?: Joke;
    nextJoke: (history: any) => void;
    previousJoke: (history: any) => void;
    searchClickHandler: () => void;
}

// tslint:disable-next-line:variable-name
export const Buttons = (props: ButtonsProps) => {
    const history = useHistory();

    const nextClickHandler = () => props.nextJoke(history);
    const previousClickHandler = () => props.previousJoke(history);
    const shareClickHandler = () => {
        if ('share' in navigator) {
            (navigator as any).share({
                text: props.joke?.text[0].substring(0, 20).concat('...'),
                title: 'Jokify',
                url: `https://carlescapellas.xyz/jokify/${props.joke?.id}`
            });
        }
    };

    return (
        <div className="buttons">
            <button type="button" className="previous-button" onClick={previousClickHandler}>
                <span>◀️</span>
            </button>

            <button type="button" className="search-button" onClick={props.searchClickHandler}>
                <span>🔎</span>
            </button>

            <button type="button" className="share-button" onClick={shareClickHandler}>
                <span>📩</span>
            </button>

            <button type="button" className="next-button" onClick={nextClickHandler}>
                <span>▶️</span>
            </button>
        </div>
    );
};
