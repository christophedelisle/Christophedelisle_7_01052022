//import Header from "./components/Header/Header";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
