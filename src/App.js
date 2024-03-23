import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemIndex from './views/ItemIndex';
import ItemDetails from './components/ItemDetails/ItemDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home';
import { LoadingProvider } from './hooks/useLoading';

function App() {
  return (
      <section className='main grid'>
        <Router>
          <LoadingProvider>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/film" element={<ItemIndex />} />
              <Route path="/film/:id" element={<ItemDetails />} />

              <Route path="/character" element={<ItemIndex />} />
              <Route path="/character/:id" element={<ItemDetails />} />

              <Route path="/planet" element={<ItemIndex />} />
              <Route path="/planet/:id" element={<ItemDetails />} />

              <Route path="/specie" element={<ItemIndex />} />
              <Route path="/specie/:id" element={<ItemDetails />} />

              <Route path="/starship" element={<ItemIndex />} />
              <Route path="/starship/:id" element={<ItemDetails />} />
              
              <Route path="/favorite" element={<ItemIndex />} />

            </Routes>
          </LoadingProvider>
        </Router>
      </section>
  );
}

export default App;
