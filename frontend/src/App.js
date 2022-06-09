import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";

// Implementation of "roads" (paths to the different pages) of the application

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
