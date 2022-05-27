//import Header from "./components/Header/Header";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    /*<div className="App">
      test
      <Header title="titre1 test" nav={["acceuille1", "nav1"]} />
      <Header title="titre2 test" nav={["acceuille2", "nav2"]} />
    </div>*/
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
