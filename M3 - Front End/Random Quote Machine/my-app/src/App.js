import logo from './logo.svg';
import './App.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

const textArray = [['Qui cache son fou meurt sans voix.', 'Henri Michaux'], ["Vivre c'est d'abord se tenir pret a recevoir le ciel sur la tete.", 'Yasmina Khadra'], ['Bonsoir Paris !', 'Celine Dion'], ["Quand un philosophe me répond, je ne comprends plus ma question.", 'Pierre Desproges'], ["Définissez-moi d'abord ce que vous entendez par Dieu et je vous dirai si j'y crois.", "Albert Einstein"], ["Chaud cacao, chaud chocolat, si tu me donnes tes noix de coco, moi je te donne mes ananas !", "Annie Cordy"]];

function pickRandomQuote() {
  return Math.floor(Math.random() * textArray.length);;
}

let randomNumber = pickRandomQuote();
let previousRandomNumber = randomNumber;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: textArray[randomNumber][0],
      author: textArray[randomNumber][1] };

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    let newRandomNumber = pickRandomQuote();
    if (newRandomNumber == previousRandomNumber) {
      if (newRandomNumber == 0) {
        newRandomNumber = newRandomNumber + 1;
      } else {newRandomNumber = newRandomNumber - 1;}
    }
    previousRandomNumber = newRandomNumber;

    this.setState({
      text: textArray[newRandomNumber][0],
      author: textArray[newRandomNumber][1] });

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "quote-box" }, /*#__PURE__*/
      React.createElement("div", { id: "text" },
      this.state.text), /*#__PURE__*/

      React.createElement("div", { id: "author" },
      this.state.author), /*#__PURE__*/

      React.createElement("button", { id: "new-quote", onClick: this.handleClick }, "New Quote"), /*#__PURE__*/
      React.createElement("a", { id: "tweet-quote", href: "twitter.com/intent/tweet", target: "_blank" }, "tweet")));


  }}

export default App;