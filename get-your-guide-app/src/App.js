// src/App.js
import React from 'react';
import { BrowserRouter as Router,Link, Route, Switch } from 'react-router-dom';
import './App.css';
import LocationList from './components/LocationList';
import AdminBookingTable from './components/AdmingBookingTable';

function App() {
  return (
    <Router>
      <div>
      <nav>
          <h1>
            Get Your Guide
            </h1>
        </nav>
        <Switch>
          <Route path="/" exact component={LocationList} />
          <Route path="/admin" component={AdminBookingTable} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
