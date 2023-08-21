import React, {useContext} from 'react';
import { HashRouter, Routes, Route } from "react-router-dom"

import './App.css';
import {ThemeProvider} from './Components/context/ViewMode'

import Header from './Components/Header'
import HomeBody from './Components/HomeBody';
import About from './Components/About';
import Layout from './Components/Layout';
import Browse from './Components/Browse';
import BookDetail from './Components/BookDetail';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
 
  
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeBody />} />
            <Route path="about" element={<About />} />
            <Route path="browse" element={<Browse />} />
            <Route path="browse/:id/*" element={<BookDetail />}/>
            
      
          </Route>
          <Route path="*" element={<h1> 404 Page not found</h1>}/>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
