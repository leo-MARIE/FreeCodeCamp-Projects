import logo from './logo.svg';
import './App.css';

import * as React from "react";
import * as ReactDOM from "react-dom";

const buttons = [
{ id: 'clear', letter: "AC" },
{ id: 'divide', letter: "/" },
{ id: 'multiply', letter: "*" },
{ id: 'subtract', letter: "-" },
{ id: 'add', letter: "+" },
{ id: 'decimal', letter: "." },
{ id: 'equals', letter: "=" },
{ id: 'zero', letter: "0" },
{ id: 'one', letter: "1" },
{ id: 'two', letter: "2" },
{ id: 'three', letter: "3" },
{ id: 'four', letter: "4" },
{ id: 'five', letter: "5" },
{ id: 'six', letter: "6" },
{ id: 'seven', letter: "7" },
{ id: 'eight', letter: "8" },
{ id: 'nine', letter: "9" }];


class Button extends React.Component {// child
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  } // constructor

  // methods are defined in child

  handleClick() {
    this.props.handleDisplay(this.props.letter); // when we click it update state thanks to passed method and id
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        className: "button",
        id: this.props.id,
        onClick: this.handleClick },

      this.props.letter));



  } // render
} // Number

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "0" };

    this.handleDisplay = this.handleDisplay.bind(this);
  } // constructor

  handleDisplay(btn) {// the only method defined in parent is the one which set state


    if (btn == "AC") {
      this.setState({
        input: "0" });

    } // if AC
    else if (btn == "0" && this.state.input == 0) {
        //do nothing
      } // else if double 0
      else if (/[1-9]/.test(btn) && this.state.input == "0") {
          this.setState({
            input: btn });

        } // else if delete 0
        // next 3 else are for multiple operators
        else if ((btn == "+" || btn == "*" || btn == "/") && /(\d|\.)[-\/\*\+]{1}$/.test(this.state.input)) {
            this.setState({
              input: this.state.input.slice(0, -1).concat(btn) });

          } // else if btn is /*+ and input is number and operator
          else if (btn == "-" && /(\d|\.)[-]{1}$/.test(this.state.input)) {
              // do nothing
            } // else if btn is - and input is number and -
            else if ((btn == "+" || btn == "*" || btn == "/") && /(\d|\.)[\/\*\+]{1}[-]{1}$/.test(this.state.input)) {
                this.setState({
                  input: this.state.input.slice(0, -2).concat(btn) });

              } // else if btn is /*+ and input is number and /*+ and -
              else
                if (btn == "." && /\d\.\d*\.*$/.test(this.state.input)) {// jen suis la, regex marche pas
                  //do nothing
                } // else if double .
                else
                  if (btn === "=") {
                    this.setState({
                      input: eval(this.state.input).toString() });

                  } // else if equals
                  else

                    {// update the input
                      this.setState({
                        input: this.state.input.concat(btn) });

                    } // else

  } // handleDisplay

  // we will pass props and parent method in the parent render method below:
  render() {

    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { id: "calculator" }, /*#__PURE__*/
      React.createElement("div", { id: "display" },
      this.state.input), /*#__PURE__*/

      React.createElement("div", { id: "buttons" },
      buttons.map((d) => /*#__PURE__*/
      React.createElement(Button, {
        key: d.id,
        letter: d.letter,
        id: d.id,
        value: d.value,
        handleDisplay: this.handleDisplay }))))));





  } // render
} // App

export default App;
