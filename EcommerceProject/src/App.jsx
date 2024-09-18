import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login";
import ItemList from "./components/ItemList";
import ReviewList from "./components/ReviewList";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './App.css'

function App() {
  const [token, setToken] = useState(null);

  return (
    <div>
    <NavBar token={token} setToken={setToken}/>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register setToken={setToken}/>}/>
      <Route path="/login" element={<Login setToken={setToken}/>}/>
      <Route path="/items" element={<ItemList token={token}/>}/>
      <Route path="/reviews" element={<ReviewList token={token}/>}/>
      <Route path="/commentform" element={<CommentForm token={token}/>}/>
      </Routes>
   </div>
  );
}

export default App
