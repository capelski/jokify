import React from 'react';
import { Joke } from '../types';

interface JokesProps {
    animationDirection: string;
    areOptionsVisible: boolean;
    currentIndex: number;
    jokes: Joke[];
    swipePosition: number;
}

export const Jokes: React.FC<JokesProps> = props => (
    <React.Fragment>
        <div
            className={`jokes${props.areOptionsVisible ? ' options-visible' : ''}`}
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
