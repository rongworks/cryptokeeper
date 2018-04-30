import React, { Component } from 'react';
import Inventory from './components/inventory/inventory.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Inventory></Inventory>
      </div>
    );
  }
}

export default App;
