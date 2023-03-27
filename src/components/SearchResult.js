import React from "react";

import "./SearchResult.css"

export const SearchResult = ({result}) => {
    return (
        <div>
            <button className="search-result" onClick={(e) =>
            alert(`You clicked on ${result.name}`)}>{result.name}</button>
        </div>
        
    );

}