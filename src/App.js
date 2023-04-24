
import { useState, useEffect} from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { SearchResultsList } from './components/SearchResultsList';
import Axios from "axios";


function App() {
  const CORRECT = "#CAF2C2";
  const CLOSE = "#FFF8B8";
  const WRONG = "#FFD6C9";

  const [results, setResults] = useState([]);

  const[guessedPlayers, setGuessedPlayers] = useState([]);

  const[result, setResult] = useState("");

  const[colorNumber, setColorNumber] = useState("");
  const[displayNumber, setDisplayNumber] = useState("");

  const[colorBats, setColorBats] = useState("");
  const[displayBats, setDisplayBats] = useState("");
  
  const[colorHand, setColorHand] = useState("");
  const[displayHand, setDisplayHand] = useState("");

  const[colorBirthDate, setColorBirthDate] = useState("");
  const[displayBirthDate, setDisplayBirthDate] = useState("");

  const[colorAllStar, setColorAllStar] = useState("");
  const[displayAllStar, setDisplayAllStar] = useState("");

  const[colorBwar, setColorBwar] = useState("");
  const[displayBwar, setDisplayBwar] = useState("");

  const pickPlayer = (id) => {
    let url = `https://alltimemetsapi.herokuapp.com/player?id=${id}`;
    Axios.get(url).then((res) => {

      const newGuessedPlayers = [...guessedPlayers, res.data];
      setGuessedPlayers(newGuessedPlayers);
      checkNumber(res.data.number);
      checkBats(res.data.bats);
      checkHand(res.data.hand);
      checkBirthDate(res.data.birthYear);
      checkAllStars(res.data.allStars);
      checkBwar(res.data.bwar);
      if (res.data.id === chosenPlayer.id) {
        setResult("Correct!")
        const clear = [];
        setGuessedPlayers(clear);
        pickChosenPlayer();
      }
      else {
        setResult("Wrong")
      }
    });

  }

  //↓ ↑

  const checkNumber = (number) => {
    if (colorNumber !== CORRECT) {
      if (number === chosenPlayer.number){
        setColorNumber(CORRECT);
        setDisplayNumber(number);

      }
      else if (Math.abs( number - chosenPlayer.number) < 11) {
        setColorNumber(CLOSE);
        if(Math.sign( number - chosenPlayer.number) > 0) {
          setDisplayNumber("↓" + number);
        }
        else {
          setDisplayNumber("↑" + number);
        }
      } else {
        if(colorNumber !== CLOSE) {
          setColorNumber(WRONG);
          setDisplayNumber(number);
        }
      }
    }
  }

  const checkBats = (bats) => {
    if (colorBats !== CORRECT) {
      if (bats === chosenPlayer.bats){
        setColorBats(CORRECT);
        setDisplayBats(bats);
      }
      else {
        setColorBats(WRONG);
        setDisplayBats(bats);
      }
    }
  }

  const checkHand = (hand) => {
    if (colorHand !== CORRECT) {
      if (hand === chosenPlayer.hand){
        setColorHand(CORRECT);
        setDisplayHand(hand);
      }
      else {
        setColorHand(WRONG)
        setDisplayHand(hand);
      }
    }
  }

  const checkBirthDate = (year) => {
    if(colorBirthDate !== CORRECT) {
      if(year === chosenPlayer.birthYear) {
        setColorBirthDate(CORRECT);
        setDisplayBirthDate(year);
      }
      else if (Math.abs(year - chosenPlayer.birthYear) < 11) {
        
        setColorBirthDate(CLOSE);
        if(Math.sign( year - chosenPlayer.birthYear) > 0) {
          setDisplayBirthDate("↓" + year);
        }
        else {
          setDisplayBirthDate("↑" + year);
        }
      } else {
        if(colorBirthDate !== CLOSE) {
          setColorBirthDate(WRONG);
          setDisplayBirthDate(year);
        }
      }
    }
  }

  const checkAllStars = (allStars) => {
    if(colorAllStar !== CORRECT) {
      if(allStars === chosenPlayer.allStars) {
        setColorAllStar(CORRECT);
        setDisplayAllStar(allStars);
      }
      else if (Math.abs(allStars - chosenPlayer.allStars) < 4) {
        setColorAllStar(CLOSE);
        if(Math.sign(allStars - chosenPlayer.allStars) > 0) {
          
          setDisplayAllStar("↓" + allStars);
        }
        else {
          setDisplayAllStar("↑" + allStars);
        }
      } else {
        if(colorAllStar !== CLOSE) {
          setColorAllStar(WRONG);
          setDisplayAllStar(allStars);
        }
      }
    }
  }

  const checkBwar = (bwar) => {
    if(colorBwar !== CORRECT) {
      if(bwar === chosenPlayer.bwar) {
        setColorBwar(CORRECT);
        setDisplayBwar(bwar);
      }
      else if (Math.abs(bwar - chosenPlayer.bwar) < 10.1) {
        setColorBwar(CLOSE);
        if(Math.sign(bwar - chosenPlayer.bwar) > 0) {
          setDisplayBwar("↓" + bwar);
        }
        else {
          setDisplayBwar("↑" + bwar);
        }
      } else {
        if(colorBwar !== CLOSE) {
          setColorBwar(WRONG);
          setDisplayBwar(bwar);
        }
      }
    }
  }


  const [chosenPlayer, setChosenPlayer] = useState([]);

  const pickChosenPlayer = () => {
    setColorNumber("");
    setDisplayNumber("");
    setColorBats("");
    setDisplayBats("");
    setColorHand("");
    setDisplayHand("");
    setColorBirthDate("");
    setDisplayBirthDate("");
    setColorAllStar("");
    setDisplayAllStar("");
    setColorBwar("");
    setDisplayBwar("");
    const url = "https://alltimemetsapi.herokuapp.com/random";
    Axios.get(url).then((res) => {
      setChosenPlayer(res.data)
      
    });
  }

  useEffect(() => {
    pickChosenPlayer();
  }, []);
  
  return (
    <div className="App">
      <div className='chosen'>
      {/*<button className= "startGame" onClick={pickChosenPlayer}> set player </button>*/}
        <h1 className="chosenPlayer"> Name: {chosenPlayer.name}</h1>
        <table>
          <caption>Guess the Player</caption>
          <tr>
              <th scope="col">Number</th>
              <th scope="col">Bats</th>
              <th scope="col">Throws</th>
              <th scope="col">Birth Year</th>
              <th scope="col">Position</th>
              <th scope="col">All Stars</th>
              <th scope="col">bwar</th>
          </tr>
          <tr>
              <td style={{background:colorNumber}}>{displayNumber}</td>
              <td style={{background:colorBats}}>{displayBats}</td>
              <td style={{background:colorHand}}>{displayHand}</td>
              <td style={{background:colorBirthDate}}>{displayBirthDate}</td>
              <td>{chosenPlayer.position}</td>
              <td style={{background:colorAllStar}}>{displayAllStar}</td>
              <td style={{background:colorBwar}}>{displayBwar}</td>
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
              <th scope="col">Birth Year</th>
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
