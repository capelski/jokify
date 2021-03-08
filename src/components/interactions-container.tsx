import React from 'react';
import { useSwipeable } from 'react-swipeable';

export interface ControllerProps {
    hasFinishedInitialLoad: boolean;
    nextJoke: () => void;
    onSwipe: (swipePosition: number) => void;
    previousJoke: () => void;
    theme: string;
}

// tslint:disable-next-line:variable-name
export const InteractionsContainer: React.FC<ControllerProps> = props => {
    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.keyCode === 37) {
            props.previousJoke();
        } else if (event.keyCode === 39) {
            props.nextJoke();
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft(eventData) {
            props.onSwipe(0);
            if (Math.abs(eventData.deltaX) > 80) {
                props.nextJoke();
            }
        },
        onSwipedRight(eventData) {
            props.onSwipe(0);
            if (Math.abs(eventData.deltaX) > 80) {
                props.previousJoke();
            }
        },
        onSwiping(eventData) {
            if (Math.abs(eventData.deltaX) > 40) {
                props.onSwipe(eventData.deltaX);
            }
        }
    });

    return (
        <div
            {...swipeHandlers}
            className={`app ${props.theme}${
                props.hasFinishedInitialLoad ? ' has-finished-initial-load' : ''
            }`}
            tabIndex={0}
            onKeyDown={onKeyDown}
        >
            {props.children}
        </div>
    );
};
