import { useState } from "react";
// custom hooks

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(mode, replace = false) {
    setMode(mode);
    if (replace) {
      setHistory([...history.slice(0, history.length - 1), mode]);
    } else {
      setHistory([...history, mode]);
    }
  }
  function back() {
    // console.log(history);
    if (history.length >= 2) {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, history.length - 1));
    }
  }
  return { mode, transition, back };
}
