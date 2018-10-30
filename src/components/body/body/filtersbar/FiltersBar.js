import React from 'react';

import './FiltersBar.css';

const FiltersBar = (props) => {
    return (
        <div className="filters">
            Sort by : 
            <button
                onClick={e => props.addFilter({category: "likes", value: "like"})}
            >Likes </button> |
            <button
                onClick={e => props.addFilter({category: "likes", value: "hate"})}
            >Hates </button> |
            <button
                onClick={e => props.addFilter({category: "date", value: "date"})}
            >Date </button>
        </div>
    )
}

export default FiltersBar;