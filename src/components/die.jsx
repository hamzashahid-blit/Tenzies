import React from "react";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div className="die" style={styles} onClick={props.holdDie}>
      <h1 className="die--number">{props.number}</h1>
    </div>
  );
}

export default Die;
