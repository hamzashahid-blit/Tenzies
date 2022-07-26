import React from "react";
import "./App.css";
import Die from "./components/die.jsx";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    setTenzies(() => {
      let firstValue = dice[0].number;
      for (let die of dice) {
        if (!die.isHeld || die.number !== firstValue) {
          return false;
        }
      }
      console.log("Congrats, you won!");
      return true;
    });
  }, [dice]);

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
    setDice(allNewDice());
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
        <div className="dice">{diceElements}</div>
        <button className="roll-btn" onClick={tenzies ? newGame : rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
      {tenzies && <Confetti />}
    </>
  );
}

export default App;
