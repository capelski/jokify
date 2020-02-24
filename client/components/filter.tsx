import React, { useState } from 'react';

interface FilterProps {
    inputReference: React.RefObject<HTMLInputElement>;
    onFilterChange: (filter: string) => void;
}

// tslint:disable-next-line:variable-name
export const Filter: React.FC<FilterProps> = props => {
    const [filter, setFilter] = useState('');

    const filterChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // necessary casting for the server side
        const filterValue = (event.target as { value: string }).value;
        setFilter(filterValue);
        props.onFilterChange(filterValue);
    };

    return (
        <div className="filter">
            <input
                ref={props.inputReference}
                type="text"
                value={filter}
                onChange={filterChangeHandler}
            />
        </div>
    );
};
