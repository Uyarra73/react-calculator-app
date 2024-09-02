import { useState } from "react";
import { evaluate } from "mathjs";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [lastKey, setLastKey] = useState("");

  const handleClick = (e) => {
    const currentDisplay = e.target.textContent;
    if (display === "0" || lastKey === "=") {
      setDisplay(currentDisplay);
    } else {
      setDisplay(display + currentDisplay);
    }
    setLastKey(currentDisplay);
  };

  const handleClear = () => {
    setDisplay("0");
    setLastKey("");
  };

  const handleOperator = (e) => {
    const operator = e.target.textContent;
    const lastChar = display[display.length - 1];

    // Check if the last character is an operator
    if (/[\+\-\*\/]$/.test(lastChar)) {
      // If the last operator is a minus sign and the new operator is also a minus sign, allow it
      if (operator === '-' && lastChar !== '-') {
        setDisplay(display + operator);
      } 
      // Replace the last operator with the new operator
      else if (operator !== '-' || (operator === '-' && /[\+\*\/]$/.test(display.slice(0, -1)))) {
        setDisplay(display.slice(0, -1) + operator);
      }
    } else {
      // Append the operator normally
      setDisplay(display + " " + operator + " ");
    }
    setLastKey(operator);
  };

  const handleDecimal = () => {
    const parts = display.split(/[\+\-\*\/\s]/); // Split by operators and spaces
    const lastPart = parts[parts.length - 1];

    if (!lastPart.includes(".")) {
      setDisplay(display + ".");
      setLastKey(".");
    }
  };

  const handleEqual = () => {
    try {
      const result = evaluate(display.replace(/ /g, "")); // Remove spaces
      setDisplay(result.toString());
      setLastKey("=");
    } catch (error) {
      setDisplay("Error");
      console.error("Error evaluating expression:", error);
    }
  };

  return (
    <div className="App">
      <h1>Simple Calculator</h1>
      <div className="calculator">
        <div id="display" className="row">
          {display}
        </div>
        <div id="clear" className="row" onClick={handleClear}>
          AC
        </div>
        <div id="seven" onClick={handleClick}>
          7
        </div>
        <div id="eight" onClick={handleClick}>
          8
        </div>
        <div id="nine" onClick={handleClick}>
          9
        </div>
        <div id="multiply" onClick={handleOperator}>
          *
        </div>
        <div id="four" onClick={handleClick}>
          4
        </div>
        <div id="five" onClick={handleClick}>
          5
        </div>
        <div id="six" onClick={handleClick}>
          6
        </div>
        <div id="divide" onClick={handleOperator}>
          /
        </div>
        <div id="one" onClick={handleClick}>
          1
        </div>
        <div id="two" onClick={handleClick}>
          2
        </div>
        <div id="three" onClick={handleClick}>
          3
        </div>
        <div id="add" onClick={handleOperator}>
          +
        </div>
        <div id="zero" onClick={handleClick}>
          0
        </div>
        <div id="decimal" onClick={handleDecimal}>
          .
        </div>
        <div id="equals" onClick={handleEqual}>
          =
        </div>
        <div id="subtract" onClick={handleOperator}>
          -
        </div>
      </div>
    </div>
  );
}

export default App;
