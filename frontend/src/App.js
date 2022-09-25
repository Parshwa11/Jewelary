import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Productlist from './components/Productlist';
import Productload from './components/Productload';
import CreateProduct from './components/CreateProduct';


function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Productlist />} />
      <Route path="/product/:id" element={<Productload />} />
      <Route path="/addNew" element={<CreateProduct />} />

    </Routes>
  </div>
  );
}

export default App;
