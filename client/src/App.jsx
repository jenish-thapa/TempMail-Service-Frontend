import React from "react";
import {
  Routes,
  Route,
  Link,
  Dashboard,
  EmailDetails,
  Home,
} from "./imports/imports";
import "./App.css";

function App() {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mail/inbox" element={<Dashboard />} />
        <Route path="/mail/inbox/:id" element={<EmailDetails />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </div>
  );
}

export default App;
