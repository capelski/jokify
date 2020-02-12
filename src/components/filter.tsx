import React, { useState } from 'react';

interface FilterProps {
    onFilterChange: (filter: string) => void;
}

// tslint:disable-next-line:variable-name
export const Filter = (props: FilterProps) => {
    const [filter, setFilter] = useState('');

    const filterChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filterValue = event.target.value;
        setFilter(filterValue);
        props.onFilterChange(filterValue);
    };

    return (
        <div className="filter">
            <input type="text" value={filter} onChange={filterChangeHandler} />
        </div>
    );
};
