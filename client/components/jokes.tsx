import React from 'react';
import { Joke } from '../types';

interface JokesProps {
    animationDirection: string;
    currentIndex: number;
    isFilterVisible: boolean;
    jokes: Joke[];
    swipePosition: number;
}

// tslint:disable-next-line:variable-name
export const Jokes: React.FC<JokesProps> = props => (
    <React.Fragment>
        <div
            className={`jokes${props.isFilterVisible ? ' filter-visible' : ''}`}
            style={{
                transform: `translateX(${-props.swipePosition}px)`
            }}
        >
            {props.jokes.map((joke, index) => {
                const cssClass =
                    index < props.currentIndex
                        ? 'older'
                        : index > props.currentIndex
                        ? 'newer'
                        : 'current';
                return (
                    <div key={index} className={`joke ${props.animationDirection} ${cssClass}`}>
                        <p className="top-spacer"></p>
                        {joke.text.map(paragraph => (
                            <p
                                key={paragraph}
                                className="joke-paragraph"
                                dangerouslySetInnerHTML={{
                                    __html: paragraph
                                }}
                            />
                        ))}
                        <p className="bottom-spacer"></p>
                    </div>
                );
            })}
        </div>
    </React.Fragment>
);
