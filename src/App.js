// src/App.js

import React from "react";
import "./App.css";
import AkarBilanganCalculator from "./components/AkarBilanganCalculator";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Ranking from "./components/Ranking";
import DataUser from "./components/DataUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/hitung" element={<AkarBilanganCalculator />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/data-user" element={<DataUser />} />
      </Routes>
    </div>
  );
}

export default App;
