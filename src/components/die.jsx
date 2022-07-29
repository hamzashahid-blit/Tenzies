import React from "react";

function Die(props) {
  const [pips, setPips] = React.useState(Array(6).fill());
  const [pipElements, setPipElements] = React.useState([]);

  // Set first "props.number" elements of PIPS to true
  React.useEffect(() => {
    setPips((prevPips) => {
      return prevPips.map((_, i) => i < props.number);
    });
  }, [props.number]);

  // Create the actual dots depending on PIPS
  React.useEffect(() => {
    setPipElements(() => {
      let elems = [];
      for (let i = 0; i < pips.length; i++) {
        pips[i] && elems.push(<span key={i} className="pip"></span>);
      }
      return elems;
    });
  }, [pips]);

  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div className="die" style={styles} onClick={props.holdDie}>
      {pipElements}
    </div>
  );
}

export default Die;
