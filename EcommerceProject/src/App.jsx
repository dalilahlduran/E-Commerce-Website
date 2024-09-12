import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import ItemList from "./components/ItemList";
import ReviewList from "./components/ReviewList";
import CommentList from "./components/CommentList";

import './App.css'

function App() {
  const [token, setToken] = useState(null);

  return (
   <div>
    <NavBar token={token} setToken={setToken}/>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register setToken={setToken}/>}/>
      <Route path="/items" element={<ItemList token={token}/>}/>
      <Route path="/reviews" element={<ReviewList token={token}/>}/>
      <Route path="/comments" element={<CommentList token={token}/>}/>
    </Routes>
    <h1>ECommerce Website</h1>
    <p>Help the world with your opinion!<br></br>
    Use the Ecommerce Reviews website to find all your favorite products and leave reviews, as well as comment on other people's thoughts.</p>
   </div>
  );
}

export default App
