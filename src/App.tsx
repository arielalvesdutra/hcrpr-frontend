import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'

import './App.css';
import Header from './layouts/Header'
import NavAside from './layouts/NavAside'
import AppRoutes from './routes'

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="menuAside-and-content">
          <NavAside />
          <AppRoutes></AppRoutes>
        </div>
      </div>
    </Router>
  );
}

export default App;
