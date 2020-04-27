import React from 'react';
import { NavigationMode } from '../types';

interface OptionsProps {
    filterText: string;
    getNewestJoke?: () => void;
    getOldestJoke?: () => void;
    jokeId?: number;
    navigationMode: NavigationMode;
    onFilterChange: (filter: string) => void;
    setNavigationMode: (navigationMode: NavigationMode) => void;
}

// tslint:disable-next-line:variable-name
export const Options: React.FC<OptionsProps> = props => {
    const filterChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // necessary casting for the server side
        const filterValue = (event.target as { value: string }).value;
        props.onFilterChange(filterValue);

        if (filterValue && props.navigationMode !== 'filtered') {
            props.setNavigationMode('filtered');
        } else if (!filterValue && props.navigationMode === 'filtered') {
            props.setNavigationMode('random');
        }
    };

    const randomClickHandler = () => {
        if (props.navigationMode === 'random') {
            props.setNavigationMode('sorted');
        } else if (props.navigationMode === 'sorted') {
            props.setNavigationMode('random');
        }
    };

    const clearSearchHandler = () => {
        props.onFilterChange('');
        props.setNavigationMode('random');
    };

    return (
        <div className="options">
            <div className="order">
                <button
                    type="button"
                    className={`button random-button${
                        props.navigationMode === 'random'
                            ? ' selected'
                            : props.navigationMode === 'filtered'
                            ? ' disabled-button'
                            : ''
                    }`}
                    onClick={randomClickHandler}
                >
                    <svg
                        enableBackground="new 0 -256 1800 1800"
                        viewBox="0 -256 1800 1800"
                        height="32px"
                        width="32px"
                    >
                        <path d="m 666,1055 q -60,-92 -137,-273 -22,45 -37,72.5 -15,27.5 -40.5,63.5 -25.5,36 -51,56.5 -25.5,20.5 -63,35 Q 300,1024 256,1024 H 32 q -14,0 -23,9 -9,9 -9,23 v 192 q 0,14 9,23 9,9 23,9 h 224 q 250,0 410,-225 z M 1792,256 q 0,-14 -9,-23 L 1463,-87 q -9,-9 -23,-9 -13,0 -22.5,9.5 -9.5,9.5 -9.5,22.5 v 192 q -32,0 -85,-0.5 -53,-0.5 -81,-1 -28,-0.5 -73,1 -45,1.5 -71,5 -26,3.5 -64,10.5 -38,7 -63,18.5 -25,11.5 -58,28.5 -33,17 -59,40 -26,23 -55,53.5 -29,30.5 -56,69.5 59,93 136,273 22,-45 37,-72.5 15,-27.5 40.5,-63.5 25.5,-36 51,-56.5 25.5,-20.5 63,-35 Q 1108,384 1152,384 h 256 v 192 q 0,14 9,23 9,9 23,9 12,0 24,-10 l 319,-319 q 9,-9 9,-23 z m 0,896 q 0,-14 -9,-23 L 1463,809 q -9,-9 -23,-9 -13,0 -22.5,9.5 -9.5,9.5 -9.5,22.5 v 192 h -256 q -48,0 -87,-15 -39,-15 -69,-45 Q 966,934 945,902.5 924,871 900,825 868,763 822,654 793,588 772.5,543 752,498 718.5,438 685,378 654.5,338 624,298 580.5,255 537,212 490.5,186.5 444,161 384,144.5 324,128 256,128 H 32 q -14,0 -23,9 -9,9 -9,23 v 192 q 0,14 9,23 9,9 23,9 h 224 q 48,0 87,15 39,15 69,45 30,30 51,61.5 21,31.5 45,77.5 32,62 78,171 29,66 49.5,111 20.5,45 54,105 33.5,60 64,100 30.5,40 74,83 43.5,43 90,68.5 46.5,25.5 106.5,42 60,16.5 128,16.5 h 256 v 192 q 0,14 9,23 9,9 23,9 12,0 24,-10 l 319,-319 q 9,-9 9,-23 z" />
                    </svg>
                </button>
                <span className="joke-id">{props.jokeId}</span>
                <button
                    type="button"
                    className={`button oldest-button${
                        props.getOldestJoke ? '' : ' disabled-button'
                    }`}
                    onClick={props.getOldestJoke}
                >
                    <svg
                        enableBackground="new 0 0 220.682 220.682"
                        viewBox="0 0 220.682 220.682"
                        height="32px"
                        width="32px"
                    >
                        <polygon points="92.695,38.924 164.113,110.341 92.695,181.758 120.979,210.043 220.682,110.341 120.979,10.639" />
                        <polygon points="28.284,210.043 127.986,110.341 28.284,10.639 0,38.924 71.417,110.341 0,181.758" />
                    </svg>
                </button>
                <button
                    type="button"
                    className={`button newest-button${
                        props.getNewestJoke ? '' : ' disabled-button'
                    }`}
                    onClick={props.getNewestJoke}
                >
                    <svg
                        enableBackground="new 0 0 220.682 220.682"
                        viewBox="0 0 220.682 220.682"
                        height="32px"
                        width="32px"
                    >
                        <polygon points="92.695,38.924 164.113,110.341 92.695,181.758 120.979,210.043 220.682,110.341 120.979,10.639" />
                        <polygon points="28.284,210.043 127.986,110.341 28.284,10.639 0,38.924 71.417,110.341 0,181.758" />
                    </svg>
                </button>
            </div>
            <div className="filter">
                <input type="text" value={props.filterText} onChange={filterChangeHandler} />
                <span className="search-icon">
                    {props.filterText ? (
                        <svg
                            enableBackground="new 0 0 352 512"
                            viewBox="0 0 352 512"
                            height="32px"
                            width="32px"
                            className="clear-search"
                            onClick={clearSearchHandler}
                        >
                            <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
                        </svg>
                    ) : (
                        <svg
                            enableBackground="new 0 0 515.558 515.558"
                            viewBox="0 0 515.558 515.558"
                            height="32px"
                            width="32px"
                        >
                            <path d="m378.344 332.78c25.37-34.645 40.545-77.2 40.545-123.333 0-115.484-93.961-209.445-209.445-209.445s-209.444 93.961-209.444 209.445 93.961 209.445 209.445 209.445c46.133 0 88.692-15.177 123.337-40.547l137.212 137.212 45.564-45.564c0-.001-137.214-137.213-137.214-137.213zm-168.899 21.667c-79.958 0-145-65.042-145-145s65.042-145 145-145 145 65.042 145 145-65.043 145-145 145z" />
                        </svg>
                    )}
                </span>
            </div>
        </div>
    );
};
