import React from "react";

import "./SearchResult.css"

export const SearchResult = ({result, pickPlayer}) => {
    return (
        <div>
            <button className="search-result" id={result.id} onClick={(e) =>
            pickPlayer(result.id)}>{result.name} {result.id}</button>
        </div>
        
    );

}