import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";

// Mise en place des "routes" (chemins vers les différents pages) de l'application

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/posts" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
