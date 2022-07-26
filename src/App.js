import React from "react";
import "./App.css";
import Die from "./components/die.jsx";
import Stopwatch from "./components/stopwatch.jsx";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [firstGame, setFirstGame] = React.useState(true);
  const [personalBest, setPersonalBest] = React.useState(
    localStorage.getItem("personalBest")
  );
  const [stopwatch, setStopwatch] = React.useState({
    startTime: 0,
    elapsedTime: 0,
    paused: true,
  });

  // Winning the game
  React.useEffect(() => {
    setTenzies(() => {
      let firstValue = dice[0].number;
      for (let die of dice) {
        if (!die.isHeld || die.number !== firstValue) {
          return false;
        }
      }
      stopStopwatch();
      if (!personalBest || stopwatch.elapsedTime < personalBest) {
        localStorage.setItem("personalBest", stopwatch.elapsedTime);
        setPersonalBest(stopwatch.elapsedTime);
      }
      return true;
    });
  }, [dice, personalBest, stopwatch.elapsedTime]);

  // Update Stopwatch
  React.useEffect(() => {
    let intervalId = null;
    if (!stopwatch.paused) {
      intervalId = setInterval(() => {
        setStopwatch((prevWatch) => {
          return {
            ...prevWatch,
            elapsedTime: Date.now() - prevWatch.startTime,
          };
        });
      }, 1);
    } else {
      clearInterval(intervalId);
    }
    // Avoid memory leaks when user leaves the page
    return () => clearInterval(intervalId);
  }, [stopwatch]);

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie(i));
    }
    return newDice;
  }

  function generateNewDie(id) {
    return {
      id: id,
      number: Math.ceil(6 * Math.random()),
      isHeld: false,
    };
  }

  function rollDice() {
    setDice((oldDice) => {
      let id = -1;
      return oldDice.map((die) => {
        id++;
        return die.isHeld ? die : generateNewDie(id);
      });
    });
  }

  function holdDie(dieId) {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.id === dieId ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  function newGame() {
    setFirstGame(false);
    setDice(allNewDice());
    resetStopwatch();
    startStopwatch();
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        number={die.number}
        isHeld={die.isHeld}
        holdDie={() => holdDie(die.id)}
      />
    );
  });

  function startStopwatch() {
    setStopwatch((prevWatch) => {
      return {
        ...prevWatch,
        startTime: Date.now() - prevWatch.elapsedTime,
        paused: false,
      };
    });
  }

  function stopStopwatch() {
    setStopwatch((prevWatch) => {
      return {
        ...prevWatch,
        paused: true,
      };
    });
  }

  function resetStopwatch() {
    setStopwatch(() => {
      return {
        startTime: 0,
        elapsedTime: 0,
        paused: true,
      };
    });
  }

  return (
    <>
      <main className="app">
        <div className="info">
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="stopwatches">
          <Stopwatch time={stopwatch.elapsedTime} personalBest={false} />
          <div className="personal-best">
            <h2>🌟</h2>
            <Stopwatch time={personalBest} personalBest={true} />
          </div>
        </div>
        <div className="dice">{diceElements}</div>
        <button
          className="roll-btn"
          onClick={firstGame || tenzies ? newGame : rollDice}
        >
          {firstGame || tenzies ? "New Game" : "Roll"}
        </button>
      </main>
      {tenzies && <Confetti />}
    </>
  );
}

export default App;
