
import { useState } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { SearchResultsList } from './components/SearchResultsList';
import Axios from "axios";


function App() {
  const [results, setResults] = useState([]);


  const[guessedPlayers, setGuessedPlayers] = useState([]);

  const[result, setResult] = useState("");

  const pickPlayer = (id) => {
    let url = `https://alltimemetsapi.herokuapp.com/player?id=${id}`;
    Axios.get(url).then((res) => {

      const newGuessedPlayers = [...guessedPlayers, res.data];
      setGuessedPlayers(newGuessedPlayers);
      if (res.data.id === chosenPlayer.id) {
        setResult("Correct!")
        const clear = [];
        setGuessedPlayers(clear);
      }
      else {
        setResult("Wrong")
      }
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
              <td>{chosenPlayer.number}</td>
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
        <h1 className='name'>Result: {result} </h1>
        <table>
          <tr>
              <th scope="col">Name</th>
              <th scope="col">Number</th>
              <th scope="col">Bats</th>
              <th scope="col">Throws</th>
              <th scope="col">Debut Year</th>
              <th scope="col">Position</th>
              <th scope="col">All Stars</th>
              <th scope="col">bWAR</th>
          </tr>
            {guessedPlayers.map((player1) => (
              <tr>
                <td>{player1.name}</td>
                <td>{player1.number}</td>
                <td>{player1.bats}</td>
                <td>{player1.hand}</td>
                <td>{player1.birthYear}</td>
                <td>{player1.position}</td>
                <td>{player1.allStars}</td>
                <td>{player1.bwar}</td>
              </tr>
            ))}
     

      </table>
      </div>
      
    </div>
  );
}

export default App;
