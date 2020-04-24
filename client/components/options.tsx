import React, { useState } from 'react';
import { DisplayMode } from '../types';

interface OptionsProps {
    displayMode: DisplayMode;
    onFilterChange: (filter: string) => void;
    setDisplayMode: (displayMode: DisplayMode) => void;
}

// tslint:disable-next-line:variable-name
export const Options: React.FC<OptionsProps> = props => {
    const [filter, setFilter] = useState('');

    const chronologicalClickHandler = () => {
        props.setDisplayMode('chronological');
    };

    const filterChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // necessary casting for the server side
        const filterValue = (event.target as { value: string }).value;
        setFilter(filterValue);
        props.onFilterChange(filterValue);
    };

    const newestClickHandler = () => {
        // TODO
    };

    const oldestClickHandler = () => {
        // TODO
    };

    const randomClickHandler = () => {
        props.setDisplayMode('random');
    };

    return (
        <div className="options">
            <div className="order">
                <button
                    type="button"
                    className={`button random-button${
                        props.displayMode === 'random' ? ' selected' : ''
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
                <button
                    type="button"
                    className={`button chronological-button${
                        props.displayMode === 'chronological' ? ' selected' : ''
                    }`}
                    onClick={chronologicalClickHandler}
                >
                    <svg
                        enableBackground="new 0 0 187.852 187.852"
                        viewBox="0 0 187.852 187.852"
                        height="32px"
                        width="32px"
                    >
                        <path d="m185.975,75.172c-0.661-3.247-3.826-5.339-7.077-4.682-0.432,0.088-0.843,0.223-1.23,0.395-2.524,1.115-4.025,3.867-3.452,6.682 6.364,31.255-6.146,63.636-31.873,82.495-17.538,12.856-39.179,18.089-60.937,14.739-21.758-3.352-40.821-14.856-53.677-32.395-26.73-36.468-18.81-87.883 17.656-114.615 17.538-12.855 39.18-18.088 60.937-14.739 21.13,3.255 39.701,14.217 52.531,30.91l-5.516-.793c-3.283-0.474-6.322,1.805-6.793,5.085-0.472,3.28 1.805,6.321 5.085,6.793l19.915,2.864c0.132,0.019 0.262,0.018 0.394,0.028 0.156,0.012 0.313,0.034 0.468,0.034 2.936,0 5.501-2.157 5.932-5.147l2.864-19.915c0.472-3.28-1.805-6.321-5.085-6.793-3.281-0.473-6.321,1.805-6.793,5.085l-.811,5.639c-14.725-19.262-36.074-31.909-60.363-35.65-24.925-3.842-49.735,2.17-69.858,16.92-20.124,14.753-33.322,36.604-37.161,61.529-3.839,24.926 2.169,49.735 16.921,69.859 14.751,20.123 36.602,33.32 61.528,37.16 4.914,0.757 9.821,1.131 14.691,1.131 19.833,0 39.012-6.209 55.167-18.052 29.49-21.618 43.832-58.738 36.537-94.567z" />
                        <path d="m126.601,96.171h-20.48c-1.502-3.399-4.234-6.132-7.633-7.633v-46.034c0-3.313-2.687-6-6-6s-6,2.687-6,6v46.034c-5.236,2.314-8.904,7.55-8.904,13.633 0,8.218 6.686,14.904 14.904,14.904 6.083,0 11.319-3.668 13.633-8.904h20.48c3.313,0 6-2.687 6-6s-2.687-6-6-6zm-37.018,6c0-1.602 1.303-2.905 2.904-2.905s2.905,1.303 2.905,2.905-1.303,2.904-2.905,2.904-2.904-1.303-2.904-2.904z" />
                    </svg>
                </button>
                <button
                    type="button"
                    className={`button oldest-button${
                        props.displayMode === 'random' ? ' disabled-button' : ''
                    }`}
                    onClick={newestClickHandler}
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
                        props.displayMode === 'random' ? ' disabled-button' : ''
                    }`}
                    onClick={oldestClickHandler}
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
                <input type="text" value={filter} onChange={filterChangeHandler} />
                <span className="icon">
                    <svg
                        enableBackground="new 0 0 515.558 515.558"
                        viewBox="0 0 515.558 515.558"
                        height="32px"
                        width="32px"
                    >
                        <path d="m378.344 332.78c25.37-34.645 40.545-77.2 40.545-123.333 0-115.484-93.961-209.445-209.445-209.445s-209.444 93.961-209.444 209.445 93.961 209.445 209.445 209.445c46.133 0 88.692-15.177 123.337-40.547l137.212 137.212 45.564-45.564c0-.001-137.214-137.213-137.214-137.213zm-168.899 21.667c-79.958 0-145-65.042-145-145s65.042-145 145-145 145 65.042 145 145-65.043 145-145 145z" />
                    </svg>
                </span>
            </div>
        </div>
    );
};
