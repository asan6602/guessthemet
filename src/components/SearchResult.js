import React from "react";

import "./SearchResult.css"

export const SearchResult = ({result, pickPlayer}) => {
    return (
        <div className="search-box">
            <button className="search-result" id={result.id} onClick={(e) =>
            pickPlayer(result.id)}>{result.name} </button>
        </div>
        
    );

}