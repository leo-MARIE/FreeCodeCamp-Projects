import logo from './logo.svg';
import './App.css';
import * as React from "react";
import * as ReactDOM from "react-dom";

function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


function formatTime(time) {//time in s
  let seconds = Math.floor(time % 60);
  let secondsStr = "";
  if (seconds < 10) {
    secondsStr = "0" + seconds;
  } else {secondsStr = seconds.toString();}
  let minutes = Math.floor(time / 60);
  let minutesStr = "";
  if (minutes < 10) {
    minutesStr = "0" + minutes;
  } else {minutesStr = minutes.toString();}
  return minutesStr + ":" + secondsStr;
} // formatTime 

// ****** ACCURATE INTERVAL ******

const accurateInterval = (func, time) => {
  var cancel;
  var nextAt;
  var timeout;
  var wrapper;

  nextAt = new Date().getTime() + time;
  timeout = null;

  wrapper = () => {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());

    return func();
  };

  cancel = () => {
    return clearTimeout(timeout);
  };

  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel };

};

// ****** COMPONENTS ******

class TimerLengthControl extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "length-control" }, /*#__PURE__*/
      React.createElement("div", { id: this.props.titleID }, this.props.title), /*#__PURE__*/
      React.createElement("button", {
        className: "btn-level",
        id: this.props.minID,
        onClick: this.props.onClick,
        value: "-" }, "-"), /*#__PURE__*/



      React.createElement("div", { className: "btn-level", id: this.props.lengthID },
      this.props.length), /*#__PURE__*/

      React.createElement("button", {
        className: "btn-level",
        id: this.props.addID,
        onClick: this.props.onClick,
        value: "+" }, "+")));





  }}


class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "lengthControl",










    (stateToChange, sign, currentLength, timerType) => {
      if (this.state.isOn) {
        if (sign === '-' && currentLength !== 1) {
          this.setState({ [stateToChange]: currentLength - 1 });
        } else if (sign === '+' && currentLength !== 60) {
          this.setState({ [stateToChange]: currentLength + 1 });
        } // else
      } //  if is on
      if (this.state.timerType === timerType) {// if is off, if timer type
        if (sign === '-' && currentLength !== 1) {
          this.setState({ [stateToChange]: currentLength - 1 });
        } else if (sign === '+' && currentLength !== 60) {
          this.setState({ [stateToChange]: currentLength + 1 });
        }
      } else if (sign === '-' && currentLength !== 1) {// if is off, if not timer type and dec
        this.setState({
          [stateToChange]: currentLength - 1,
          timer: currentLength * 60 - 60 // also update timer
        });
      } else if (sign === '+' && currentLength !== 60) {// if not timer type and inc
        this.setState({
          [stateToChange]: currentLength + 1,
          timer: currentLength * 60 + 60 // also update timer
        });
      } // else
    });_defineProperty(this, "setBreakLength",

    e => {
      this.lengthControl(
      "breakLength",
      e.currentTarget.value,
      this.state.breakLength,
      "Session");

    });_defineProperty(this, "setSessionLength",

    e => {
      this.lengthControl(
      "sessionLength",
      e.currentTarget.value,
      this.state.sessionLength,
      "Break");

    });_defineProperty(this, "timerControl",

    () => {
      if (!this.state.isOn) {// fire if off
        this.beginCountDown();
        this.setState({ isOn: true });
      } else {// stop if running
        this.setState({ isOn: false });
        if (this.state.intervalID) {
          this.state.intervalID.cancel();
        }
      }
    });_defineProperty(this, "beginCountDown",

    () => {
      this.setState({
        intervalID: accurateInterval(() => {
          this.decrementTimer(); // 
          this.phaseControl(); // check for toggling and buzzer        	      
        }, 1000) });

    });_defineProperty(this, "decrementTimer",

    () => {
      this.setState({ timer: this.state.timer - 1 });
    });_defineProperty(this, "phaseControl",

    () => {// check for toggling and buzzer
      let timer = this.state.timer;
      this.buzzer(timer);
      if (timer < 0) {
        //      if (this.state.intervalID) {
        this.state.intervalID.cancel();
        //     }
        if (this.state.timerType === "Session") {
          this.beginCountDown();
          this.switchTimer(this.state.breakLength * 60, "Break");
        } else {
          this.beginCountDown();
          this.switchTimer(this.state.sessionLength * 60, "Session");
        }
      }
    });_defineProperty(this, "buzzer",

    _timer => {
      if (_timer === 0) {
        this.audioBeep.play();
      }
    });_defineProperty(this, "switchTimer",

    (num, str) => {
      this.setState({
        timer: num,
        timerType: str });

    });_defineProperty(this, "reset",

    () => {
      this.setState({
        breakLength: 5,
        sessionLength: 25,
        isOn: false,
        timerType: "Session",
        timer: 1500,
        intervalID: "" });

      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
      this.audioBeep.pause();
      this.audioBeep.currentTime = 0;
    });this.state = { breakLength: 5, sessionLength: 25, isOn: false, timerType: "Session", timer: 1500, intervalID: "" };} // reset

  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "main-title" }, "25 + 5 Clock"), /*#__PURE__*/
      React.createElement("div", { id: "childs" }, /*#__PURE__*/
      React.createElement("div", { id: "child1" }, /*#__PURE__*/
      React.createElement(TimerLengthControl, {
        addID: "break-increment",
        length: this.state.breakLength,
        lengthID: "break-length",
        minID: "break-decrement",
        onClick: this.setBreakLength,
        title: "Break Length",
        titleID: "break-label" })), /*#__PURE__*/


      React.createElement("div", { id: "child2" }, /*#__PURE__*/
      React.createElement(TimerLengthControl, {
        addID: "session-increment",
        length: this.state.sessionLength,
        lengthID: "session-length",
        minID: "session-decrement",
        onClick: this.setSessionLength,
        title: "Session Length",
        titleID: "session-label" }))), /*#__PURE__*/




      React.createElement("div", { className: "timer", style: this.state.alarmColor }, /*#__PURE__*/
      React.createElement("div", { className: "timer-wrapper" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label" }, this.state.timerType), /*#__PURE__*/
      React.createElement("div", { id: "time-left" }, formatTime(this.state.timer)))), /*#__PURE__*/



      React.createElement("div", { className: "timer-control" }, /*#__PURE__*/
      React.createElement("button", { id: "start_stop", className: "controlButton", onClick: this.timerControl }, "Play/Pause"), /*#__PURE__*/

      React.createElement("button", { id: "reset", className: "controlButton", onClick: this.reset }, "Reset")), /*#__PURE__*/




      React.createElement("audio", {
        id: "beep",
        preload: "auto",
        ref: audio => {
          this.audioBeep = audio;
        },
        src: "http://aliceshalloweenfun.homestead.com/boat_tug_horn.wav" })));



  }}

export default App;