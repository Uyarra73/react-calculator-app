import { useState } from "react";
import { evaluate } from "mathjs";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");

  const handleClick = (e) => {
    const currentDisplay = e.target.textContent;
    if (display === "0") {
      setDisplay(currentDisplay);
    } else {
      setDisplay(display + e.target.textContent);
    }
  };

  const handleClear = () => {
    setDisplay("0");
  };

  const handleOperator = (e) => {
    const operator = e.target.textContent;

    setDisplay(display + " " + operator + " ");
  };

  const handleDecimal = () => {
    const array = display.split(" ");
    const last = array[array.length - 1];

    if (!last.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleEqual = () => {
    setDisplay(evaluate(display));
  };

  return (
    <div className="App">
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
