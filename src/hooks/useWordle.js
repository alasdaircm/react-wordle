import { useState } from "react";

const useWordle = (solution) => {

  const [ turn, setTurn ] = useState(0);
  const [ currentGuess, setCurrentGuess ] = useState('');
  const [ guesses, setGuesses ] = useState([...Array(6)]);
  const [ history, setHistory ] = useState([]);
  const [ isCorrect, setIsCorrect ] = useState(false);
  const [ usedKeys, setUsedKeys ] = useState({});


  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return {
        key: l,
        color: 'grey'
      }
    });

    // find any green letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        l.color = 'green';
        solutionArray[i] = null;
      }      
    })

    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow';
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    })

    return formattedGuess;
  };

  const addNewGuess = (guess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = guess;
      return newGuesses;
    })

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    })
    setTurn((turn) => {
      return turn + 1;  
    });

    setUsedKeys((prevUsedKeys) => {
      let newKeys = {...prevUsedKeys};

      guess.forEach((l) => {
        const currentColor = newKeys[l.key];
        if (l.color === 'green') {
          newKeys[l.key] = 'green';
          return;
        }
        if (l.color === 'yellow' && currentColor !== 'green') {
          newKeys[l.key] = 'yellow';
          return;
        }
        if (l.color === 'grey' && currentColor !== 'yellow' && currentColor !== 'green') {
          newKeys[l.key] = 'grey';
          return;
        }
      });

      return newKeys;
    });

    setCurrentGuess('');

  };

  const handleKeyUp = ({ key }) => {
    if (key === 'Enter') {
      // Only add guess if turn is less than 5
      if (turn > 5) {
        return;
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        return;
      }
      // check word is 5 chars long
      if (currentGuess.length !== 5) {
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (key === 'Backspace') {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      })
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });        
      }
    }
  };


  return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp}

};

export default useWordle;