import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import MovieIndex from './views/MovieIndex';
import MovieDetails from './components/MovieDetails/MovieDetails';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<MovieIndex/>}>
          <Route path="/:episodeId" element={<MovieDetails/>} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
