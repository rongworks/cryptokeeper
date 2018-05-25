import React, { Component } from 'react';
import Inventory from './components/inventory/inventory.js'
import './App.css';
import { Provider } from "react-redux";
import store from "./store/Store.js";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Inventory></Inventory>
        </div>
      </Provider>
    );
  }
}

export default App;
