import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemIndex from './views/ItemIndex';
import ItemDetails from './components/ItemDetails/ItemDetails';
import { ThemeProvider } from './hooks/useTheme';
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home';
import { LoadingProvider } from './hooks/useLoading';

function App() {
  return (
    <ThemeProvider>
      <section className='main grid'>
          <Router>
        <LoadingProvider>
          <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/films" element={<ItemIndex />}>
                <Route path=":id" element={<ItemDetails />} />
              </Route>
              <Route path="/characters" element={<ItemIndex />}>
                <Route path=":id" element={<ItemDetails />} />
              </Route>
              <Route path="/planets" element={<ItemIndex />}>
                <Route path=":id" element={<ItemDetails />} />
              </Route>
              <Route path="/species" element={<ItemIndex />}>
                <Route path=":id" element={<ItemDetails />} />
              </Route>
              <Route path="/starships" element={<ItemIndex />}>
                <Route path=":id" element={<ItemDetails />} />
              </Route>
            </Routes>
        </LoadingProvider>
          </Router>
      </section>
    </ThemeProvider>
  );
}

export default App;
