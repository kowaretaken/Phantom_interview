import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Assets } from "./components/Assets";
// Init Zustand Store
// import { IStore, useStore } from './store';

function App() {
  return (
    <div className="App">
      <Assets />
    </div>
  );
}

export default App;
