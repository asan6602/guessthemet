import React from "react";
import {SearchResult} from "./SearchResult"
import "./SearchResultsList.css"

export const SearchResultsList = ({results, pickPlayer}) => {
    return (
    <div className="results-list">
        {
            results.map((result, id) => {
                return <SearchResult result={result} pickPlayer={pickPlayer} key={id}/>
            })
        }
    </div>
    );
}