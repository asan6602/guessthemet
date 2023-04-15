
import { useState } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { SearchResultsList } from './components/SearchResultsList';
import Axios from "axios";


function App() {
  const [results, setResults] = useState([]);

  const [player, setPlayer] = useState([]);

  const[guessedplayers, setGuessedPlayers] = useState([]);

  const pickPlayer = (id) => {
    let url = `https://alltimemetsapi.herokuapp.com/player?id=${id}`;
    Axios.get(url).then((res) => {
      setPlayer(res.data)
    });
  }

  const [chosenPlayer, setChosenPlayer] = useState([]);

  const pickChosenPlayer = () => {
    const url = "https://alltimemetsapi.herokuapp.com/random";
    Axios.get(url).then((res) => {
      setChosenPlayer(res.data)
    });
  }

 

  
  return (
    <div className="App">
      <div className='chosen'>
        <button className= "startGame" onClick={pickChosenPlayer}> set player </button>
        <h1 className="chosenPlayer"> Name: {chosenPlayer.name}</h1>
        <table>
          <caption>Guess the Player</caption>
          <tr>
              <th scope="col">Number</th>
              <th scope="col">Bats</th>
              <th scope="col">Throws</th>
              <th scope="col">Debut Year</th>
              <th scope="col">Position</th>
              <th scope="col">All Stars</th>
              <th scope="col">bwar</th>
          </tr>
          <tr>
              <th>{chosenPlayer.number}</th>
              <td>{chosenPlayer.bats}</td>
              <td>{chosenPlayer.hand}</td>
              <td>{chosenPlayer.birthYear}</td>
              <td>{chosenPlayer.position}</td>
              <td>{chosenPlayer.allStars}</td>
              <td>{chosenPlayer.bwar}</td>
          </tr>
      </table>
      </div>

      <div className="search-bar-container">
        <SearchBar setResults={setResults}/>
        <SearchResultsList results={results} pickPlayer={pickPlayer}/>
      </div>
      <div className="guesses">
        <h1 className='name'>Name: {player.name} </h1>
        <table>
          <tr>
              <th scope="col">Name</th>
              <th scope="col">Number</th>
              <th scope="col">Bats</th>
              <th scope="col">Throws</th>
              <th scope="col">Debut Year</th>
              <th scope="col">Position</th>
              <th scope="col">All Stars</th>
              <th scope="col">bwar</th>
          </tr>

      </table>
      </div>
      
    </div>
  );
}

export default App;
