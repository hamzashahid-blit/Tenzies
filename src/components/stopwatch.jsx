import React from "react";

function Stopwatch(props) {
  let milliseconds = padZeroes(Math.floor((props.time / 10) % 100));
  let seconds = padZeroes(Math.floor((props.time / 1000) % 60));
  let minutes = padZeroes(Math.floor((props.time / (1000 * 60)) % 60));

  function padZeroes(number, zeroes = 2) {
    let num = number.toString();
    return num.length < zeroes ? "0".repeat(zeroes - num.length) + num : num;
  }

  const normalStyle = {
    // padding: "0",
    // margin: "0",
    fontFamily: "DM Mono, sans-serif",
    fontWeight: "400",
    fontSize: "3.5rem",
    // backgroundColor: "cadetblue",
  };

  // Personal Best Style
  const pbStyle = {
    ...normalStyle,
    fontWeight: "300",
    fontSize: "2.3rem",
    paddingLeft: "5px",
  };

  return (
    <div
      className="stopwatch"
      style={props.personalBest ? pbStyle : normalStyle}
    >{`${minutes}:${seconds}:${milliseconds}`}</div>
  );
}

export default Stopwatch;
