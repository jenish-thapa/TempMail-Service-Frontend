import React from "react";
import { Routes, Route, Link, Dashboard } from "./imports/imports";
import "./App.css";

function App() {
  return (
    <div className="w-full h-full">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </div>
  );
}

export default App;
