import React, { useEffect } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <Timer></Timer>
      </header>
    </div>
  );
}

function Timer() {
  const FOCUS_SESSION = 10;
  const SHORT_BREAK = 5;
  const LONG_BREAK = 4;
  const POMODORI = 3;

  const [pomodoros, setPomodoros] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(FOCUS_SESSION) //25 mins
  const [isRunning, setIsRunning] = React.useState(false);
  // const [cycleCount, setCycleCount] = React.useState(0);
  const [isFocus, setIsFocus] = React.useState(true);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  React.useEffect(() => {
    let timeoutID; 

    if(isRunning && currentTime > 0) {
      timeoutID = setTimeout(() => {
        setCurrentTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    else if (currentTime === 0 && isRunning) {
      setIsRunning(false);
      // setCycleCount((prev) => prev + 1);

      if (isFocus) {
        setIsFocus(false); // next session is break

        if (pomodoros % POMODORI === 0 && pomodoros != 0) {
          setCurrentTime(LONG_BREAK);
        }
        else {
          setCurrentTime(SHORT_BREAK);
        }
      } else {
        setPomodoros((prev) => prev + 1);
        setIsFocus(true); // next session is focus
        setCurrentTime(FOCUS_SESSION);
      }
    }

    return () => clearTimeout(timeoutID);

  }, [isRunning, currentTime, isFocus])

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <div className="Timer">
      <h3>{formatTime(currentTime)}</h3>
      <button type="button" onClick={handleStartStop}>{isRunning ? "Stop Timer" : "Start Timer"}</button>
      <p>num of pomodoros: {pomodoros}</p>
    </div>
  );
}

export default App;
