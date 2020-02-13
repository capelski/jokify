import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Joke } from '../types';
import { Filter } from './filter';

interface ButtonsProps {
    isFilterVisible: boolean;
    joke?: Joke;
    nextJoke: (history: any) => void;
    onFilterChange: (filter: string) => void;
    previousJoke: (history: any) => void;
    setIsFilterVisible: (isFilterVisible: boolean) => void;
}

// tslint:disable-next-line:variable-name
export const Buttons: React.FC<ButtonsProps> = props => {
    const history = useHistory();
    const inputReference = useRef<HTMLInputElement>(null);

    const nextClickHandler = () => props.nextJoke(history);
    const previousClickHandler = () => props.previousJoke(history);
    const searchClickHandler = () => {
        props.setIsFilterVisible(!props.isFilterVisible);
        if (!props.isFilterVisible) {
            // The timeout is needed so the css transition has finished
            setTimeout(() => {
                inputReference.current && inputReference.current.focus();
            }, 500);
        }
    };
    const shareClickHandler = () => {
        if ('share' in navigator) {
            (navigator as any).share({
                text: props.joke?.text
                    .join(' / ')
                    .substring(0, 50)
                    .concat('...'),
                title: 'Jokify',
                url: `https://carlescapellas.xyz/jokify/${props.joke?.id}`
            });
        }
    };

    return (
        <React.Fragment>
            <div className="buttons">
                <button
                    type="button"
                    className="button previous-button"
                    onClick={previousClickHandler}
                >
                    <svg
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 492 492"
                        xmlSpace="preserve"
                        height="32px"
                        width="32px"
                    >
                        <path
                            d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
			C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
			c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864
			l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"
                        />
                    </svg>
                </button>

                <button
                    type="button"
                    className={`button search-button${
                        props.isFilterVisible ? ' filter-visible' : ''
                    }`}
                    onClick={searchClickHandler}
                >
                    <svg
                        enableBackground="new 0 0 515.558 515.558"
                        viewBox="0 0 515.558 515.558"
                        height="32px"
                        width="32px"
                    >
                        <path d="m378.344 332.78c25.37-34.645 40.545-77.2 40.545-123.333 0-115.484-93.961-209.445-209.445-209.445s-209.444 93.961-209.444 209.445 93.961 209.445 209.445 209.445c46.133 0 88.692-15.177 123.337-40.547l137.212 137.212 45.564-45.564c0-.001-137.214-137.213-137.214-137.213zm-168.899 21.667c-79.958 0-145-65.042-145-145s65.042-145 145-145 145 65.042 145 145-65.043 145-145 145z" />
                    </svg>
                </button>

                {'share' in navigator && (
                    <button
                        type="button"
                        className="button share-button"
                        onClick={shareClickHandler}
                    >
                        <svg
                            version="1.1"
                            x="0px"
                            y="0px"
                            viewBox="0 0 507.45 507.45"
                            xmlSpace="preserve"
                            width="32px"
                            height="32px"
                        >
                            <path
                                d="M408,178.5c-20.4,0-38.25,7.65-51,20.4L175.95,94.35c2.55-5.1,2.55-12.75,2.55-17.85C178.5,33.15,145.35,0,102,0
			S25.5,33.15,25.5,76.5S58.65,153,102,153c20.4,0,38.25-7.65,51-20.4l181.05,104.55c-2.55,5.1-2.55,12.75-2.55,17.85
			c0,5.1,0,12.75,2.55,17.85L153,379.95c-12.75-12.75-30.6-20.4-51-20.4c-40.8,0-73.95,33.15-73.95,73.95S61.2,507.45,102,507.45
			s73.95-33.15,73.95-73.95c0-5.1,0-10.2-2.55-17.85L354.45,308.55c12.75,12.75,30.6,20.4,51,20.4c43.35,0,76.5-33.15,76.5-76.5
			C481.95,209.1,451.35,178.5,408,178.5z"
                            />
                        </svg>
                    </button>
                )}

                <button type="button" className="button next-button" onClick={nextClickHandler}>
                    <svg
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 492.004 492.004"
                        xmlSpace="preserve"
                        height="32px"
                        width="32px"
                    >
                        <path
                            d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
			c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
			c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
			c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
                        />
                    </svg>
                </button>
            </div>
            <Filter inputReference={inputReference} onFilterChange={props.onFilterChange} />
        </React.Fragment>
    );
};
