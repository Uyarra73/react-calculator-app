import { useState } from "react";
import { evaluate } from "mathjs";
import "./App.css";

const App = () => {
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

    // Verificar si el último carácter es un operador
    if (/[+\-*/]$/.test(lastChar)) {
      if (operator === '-' && lastChar !== '-') {
        // Permitir el signo negativo inmediatamente después de otro operador que no sea '-'
        setDisplay(display + operator);
      } else {
        // Reemplazar el último operador con el nuevo operador
        setDisplay(display.slice(0, -1) + operator);
      }
    } else {
      setDisplay(display + operator);
    }
    setLastKey(operator);
  };

  const handleDecimal = () => {
    const lastNum = display.split(/[+\-*/]/).pop(); // obtener el último número

    if (!lastNum.includes(".")) {
      setDisplay(display + ".");
    }
    setLastKey(".");
  };

  const handleEqual = () => {
    try {
      const result = evaluate(display.replace(/--/g, "+"));
      setDisplay(result.toString());
      setLastKey("=");
    } catch (error) {
      setDisplay("Error");
    }
  };

  return (
    <div className="App">
      <h1>Simple React Calculator</h1>
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
};

export default App;
