import React, {useState} from "react";
import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"


export const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        fetch("https://alltimemetsapi.herokuapp.com/players").then((response) => response.json())
            .then((json) => {
                const results = json.filter((player) => {
                    return value && player && player.name && player.name.toLowerCase().includes(value)
                });
                setResults(results);
            }  
        )
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon"/>
            <input placeholder="Type to search..." value={input} 
            onChange={(e) => handleChange(e.target.value)}></input>
        </div>
    );
}