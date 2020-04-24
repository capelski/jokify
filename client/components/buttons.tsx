import React from 'react';
import { Joke, SlideDirection, DisplayMode } from '../types';
import { Options } from './options';

export interface INavigator {
    share?: (...args: any[]) => void;
}

interface ButtonsProps {
    animationDirection: SlideDirection;
    areOptionsVisible: boolean;
    displayMode: DisplayMode;
    isFirstJoke: boolean;
    joke?: Joke;
    navigator: INavigator;
    nextJoke: () => void;
    onFilterChange: (filter: string) => void;
    previousJoke: () => void;
    setAreOptionsVisible: (areOptionsVisible: boolean) => void;
    setDisplayMode: (displayMode: DisplayMode) => void;
}

// tslint:disable-next-line:variable-name
export const Buttons: React.FC<ButtonsProps> = props => {
    const optionsClickHandler = () => {
        props.setAreOptionsVisible(!props.areOptionsVisible);
    };

    const previousClickHandler = () => {
        if (!props.isFirstJoke) {
            props.previousJoke();
        }
    };

    const shareClickHandler = () => {
        if (props.navigator.share) {
            props.navigator.share({
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
                    className={`button previous-button${
                        props.animationDirection === 'slide-right' ? ' current' : ''
                    }${props.isFirstJoke ? ' disabled-button' : ''}`}
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
                    className={`button options-button${
                        props.areOptionsVisible ? ' options-visible' : ''
                    }`}
                    onClick={optionsClickHandler}
                >
                    <svg
                        enableBackground="new 0 0 15 15"
                        viewBox="0 0 15 15"
                        height="32px"
                        width="32px"
                    >
                        <path d="m14,9.3l0,-2.57l-1.575,-0.264c-0.117,-0.44 -0.292,-0.848 -0.496,-1.2l0.93,-1.285l-1.81,-1.84l-1.31,0.908c-0.38,-0.205 -0.79,-0.38 -1.196,-0.497l-0.259,-1.552l-2.568,0l-0.263,1.578c-0.437,0.117 -0.816,0.293 -1.196,0.497l-1.282,-0.905l-1.838,1.81l0.934,1.287c-0.2,0.38 -0.376,0.79 -0.493,1.228l-1.578,0.235l0,2.57l1.575,0.264c0.117,0.438 0.292,0.818 0.496,1.198l-0.93,1.315l1.809,1.813l1.312,-0.938c0.38,0.205 0.787,0.38 1.224,0.497l0.26,1.551l2.566,0l0.263,-1.578c0.408,-0.117 0.817,-0.293 1.196,-0.497l1.315,0.935l1.81,-1.812l-0.935,-1.315c0.203,-0.38 0.38,-0.76 0.495,-1.2l1.544,-0.23l0,-0.003zm-7,1.407c-1.488,0 -2.683,-1.2 -2.683,-2.69s1.225,-2.69 2.683,-2.69c1.458,0 2.683,1.198 2.683,2.69c0,1.49 -1.195,2.688 -2.683,2.688l0,0.002z" />
                    </svg>
                </button>

                <button
                    type="button"
                    className={`button share-button${
                        props.navigator.share ? '' : ' hidden-button'
                    }`}
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

                <button
                    type="button"
                    className={`button next-button${
                        props.animationDirection === 'slide-left' ? ' current' : ''
                    }`}
                    onClick={props.nextJoke}
                >
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
            <Options
                displayMode={props.displayMode}
                onFilterChange={props.onFilterChange}
                setDisplayMode={props.setDisplayMode}
            />
        </React.Fragment>
    );
};
