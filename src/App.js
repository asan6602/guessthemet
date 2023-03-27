
import { useState } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { SearchResultsList } from './components/SearchResultsList';
import Axios from "axios";

function App() {
  const [results, setResults] = useState([]);

  const [playerName, setPlayerName] = useState("hello");

  const pickPlayer = (id) => {
    let url = `https://alltimemetsapi.herokuapp.com/player?id=${id}`;
    Axios.get(url).then((res) => {
      setPlayerName(res.data.name);
    });
  }

  
  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults}/>
        <SearchResultsList results={results} pickPlayer={pickPlayer}/>
      </div>
      <h1 className='name'>Name: {playerName}</h1>
    </div>
  );
}

export default App;
