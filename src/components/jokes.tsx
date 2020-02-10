import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Joke } from '../types';

interface JokesProps {
    animationDirection: string;
    currentIndex: number;
    fetchJoke: (history: any, id?: Joke['id']) => void;
    jokes: Joke[];
}

// tslint:disable-next-line:variable-name
export const Jokes = (props: JokesProps) => {
    const history = useHistory();
    const { id } = useParams();

    // To be executed only for the first render of the application
    useEffect(() => {
        props.fetchJoke(history, id ? parseInt(id, 10) : undefined);
    }, []);

    return (
        <React.Fragment>
            <div className="jokes">
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
                {!props.jokes.length && (
                    <div className="joke loading">
                        <p className="top-spacer"></p>
                        <p className="joke-paragraph">Cargando...</p>
                        <p className="bottom-spacer"></p>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};
