import React, { Component } from "react";
import "./calculator.css";
export default class Calculator extends Component {
  value = [
    7,
    8,
    9,
    "/",
    "CE",
    4,
    5,
    6,
    "*",
    "C",
    1,
    2,
    3,
    "-",
    "=",
    0,
    ".",
    "+",
  ];

  state = {
    result: 0,
    currentValue: "",
  };

  renderValue = () => {
    return this.value.map((values, index) => {
      return (
        <button
          key={index}
          className={
            values === "="
              ? "button equal"
              : values === 0
              ? "button zero"
              : "button others"
          }
          value={values}
          onClick={() => {
            this.handleButtonClick(values);
          }}
        >
          {values}
        </button>
      );
    });
  };
  handleButtonClick = (value) => {
    const { currentValue } = this.state;
    switch (value) {
      case "=":
        this.setState({
          result: this.calculateResult(this.state.currentValue),
          currentValue: "",
        });
        break;
      case "C":
        this.setState({
          result: 0,
          currentValue: "",
        });
        break;
      case "CE":
        this.setState({
          currentValue: currentValue.slice(0, -1),
        });
        break;
      default:
        this.setState((prevState) => ({
          currentValue: prevState.currentValue + value,
        }));
        break;
    }
  };
  calculateResult = (expression) => {
    const operators = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
    };

    const tokens = expression.split(/([\+\-\*\/])/);
    let result = Number(tokens[0]);
    console.log("token", tokens);

    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const operand = Number(tokens[i + 1]);
      result = operators[operator](result, operand);
    }

    return result;
  };
  render() {
    const { result, currentValue } = this.state;
    return (
      <div className="wrapper">
        <h1>Calculator</h1>
        <input
          type="text"
          value={currentValue || result}
          className="screen"
          readOnly
        />
        <div className="container">{this.renderValue()}</div>
      </div>
    );
  }
}
