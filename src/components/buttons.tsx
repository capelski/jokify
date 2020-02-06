import React from 'react';
import { useHistory } from 'react-router-dom';

interface ButtonsProps {
    nextJoke: (history: any) => void;
    previousJoke: (history: any) => void;
    searchClickHandler: () => void;
}

// tslint:disable-next-line:variable-name
export const Buttons = (props: ButtonsProps) => {
    const history = useHistory();

    const nextClickHandler = () => props.nextJoke(history);
    const previousClickHandler = () => props.previousJoke(history);

    return (
        <div className="buttons">
            <button type="button" className="previous-button" onClick={previousClickHandler}>
                <span>◀️</span>
            </button>

            <button type="button" className="search-button" onClick={props.searchClickHandler}>
                <span>🔎</span>
            </button>

            <button type="button" className="share-button">
                <span>📩</span>
            </button>

            <button type="button" className="next-button" onClick={nextClickHandler}>
                <span>▶️</span>
            </button>
        </div>
    );
};
