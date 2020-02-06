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
                        <div className={`joke ${props.animationDirection} ${cssClass}`}>
                            <p
                                className="joke-paragraph"
                                dangerouslySetInnerHTML={{
                                    __html: joke.text
                                }}
                            />
                        </div>
                    );
                })}
                {!props.jokes.length && <div className="joke">Cargando...</div>}
            </div>
        </React.Fragment>
    );
};
