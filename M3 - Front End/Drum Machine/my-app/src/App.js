import logo from './logo.svg';
import './App.css';

/* for codepen
import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
*/
import React from 'react';
import ReactDOM from 'react-dom';

const data = [
{ id: 'Kick', letter: 'Q', src: 'https://dight310.byu.edu/media/audio/FreeLoops.com/4/4/Korg%20Kick%20Drum-2514-Free-Loops.com.mp3' },
{ id: 'Snare', letter: 'W', src: 'https://dight310.byu.edu/media/audio/FreeLoops.com/4/4/Korg%20Snare%20Drum%202-2535-Free-Loops.com.mp3' },
{ id: 'Closed HH', letter: 'E', src: 'https://dight310.byu.edu/media/audio/FreeLoops.com/4/4/Korg%20Closed%20Hi%20Hat-2502-Free-Loops.com.mp3' },
{ id: 'Open HH', letter: 'A', src: 'https://dight310.byu.edu/media/audio/FreeLoops.com/4/4/Korg%20Open%20Hi%20Hat-2517-Free-Loops.com.mp3' },
{ id: 'Side Stick', letter: 'S', src: 'https://dight310.byu.edu/media/audio/FreeLoops.com/4/4/Korg%20Side%20Kick-2529-Free-Loops.com.mp3' },
{ id: 'Cymbal', letter: 'D', src: 'https://dight310.byu.edu/media/audio/FreeLoops.com/4/4/Korg%20Cymbal-2508-Free-Loops.com.mp3' },
{ id: 'Cabasa', letter: 'Z', src: 'https://dight310.byu.edu/media/audio/FreeLoops.com/4/4/Korg%20Cabasa-2499-Free-Loops.com.mp3' },
{ id: 'Cowbell', letter: 'X', src: 'https://dight310.byu.edu/media/audio/FreeLoops.com/4/4/Korg%20Cowbell-2505-Free-Loops.com.mp3' },
{ id: 'Tambourine', letter: 'C', src: 'https://dight310.byu.edu/media/audio/FreeLoops.com/4/4/Korg%20Tamborine-2538-Free-Loops.com.mp3' }];


class Pad extends React.Component {// child
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  } // constructor

  // methods are defined in child

  componentDidMount() {// we manually add event listener
    document.addEventListener("keydown", this.handleKeyPress);
    /* window.focus()   */ // we can start with keyboard
  }
  componentWillUnmount() {//removing event listener
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(e) {// can use an arrow function so no need to bind
    if (e.keyCode === this.props.letter.charCodeAt()) {
      this.audio.play();
      this.audio.currentTime = 0;
      this.props.handleDisplay(this.props.id);
    }
  }

  handleClick() {
    this.audio.play();
    this.audio.currentTime = 0;
    this.props.handleDisplay(this.props.id); // when we click it update state thanks to passed method and id
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        className: "drum-pad",
        id: this.props.id,
        onClick: this.handleClick },

      this.props.letter, /*#__PURE__*/
      React.createElement("audio", {
        ref: ref => this.audio = ref,
        src: this.props.src,
        className: "clip",
        id: this.props.letter })));




  } // render
} // Pad


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "Click or Press Key" };

    this.handleDisplay = this.handleDisplay.bind(this);
  } // constructor

  handleDisplay(displayThat) {// the only methd defined in parent is the one which set state
    this.setState({
      display: displayThat });

  }

  // we will pass props and parent method in the parent render method below:
  render() {

    return /*#__PURE__*/(
      React.createElement("div", { id: "drum-machine" }, /*#__PURE__*/
      React.createElement("div", { id: "display" },
      this.state.display), /*#__PURE__*/

      React.createElement("div", { id: "pads" },
      data.map((d) => /*#__PURE__*/
      React.createElement(Pad, {
        key: d.id,
        src: d.src,
        letter: d.letter,
        id: d.id,
        handleDisplay: this.handleDisplay })))));




  } // render
} // App


// ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#app")); // for Codepen

export default App;