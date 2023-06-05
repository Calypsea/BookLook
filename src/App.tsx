import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css';
import Header from './Components/Header'
import HomeBody from './Components/HomeBody';
import About from './Components/About';
import Layout from './Components/Layout';
import Browse from './Components/Browse';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/BookLook" element={<Layout />}>
          <Route index element={<HomeBody />} />
          <Route path="about" element={<About />} />
          <Route path="browse" element={<Browse />} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
