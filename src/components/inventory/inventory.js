import React, { Component } from 'react';
import Asset from './asset.js'
import './inventory.css'

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inventory: []};
    //this.update = this.update.bind(this);
  }

  componentDidMount() {
    var inv = [
      {
        id: 1,
        market:'kraken',
        asset:'eth',
        quote:'eur',
        amount: 2,
        price: 479.76,
        date: '2018-04-20'
      },
      {
        id: 2,
        market:'kraken',
        asset:'str',
        quote:'eur',
        amount: 60,
        price: 0.300000,
        date: '2018-04-21'
      },
      {
        id: 3,
        market:'kraken',
        asset:'eos',
        quote:'eur',
        amount: 10,
        price: 9.4499,
        date: '2018-04-23'
      }
    ]
    this.setState({
      inventory: inv
    });
  }

  componentWillUnmount() {

  }

  updateTrades(id,trade){
    var trades = this.state.trades;
    trades[id] = trade;
    this.setState({ trades: trades });
  }

  render() {
    var trades = this.state.trades;
    var assets = this.state.inventory.map( (asset, index) =>
    <Asset
      id={asset.id}
      market={asset.market}
      asset={asset.asset}
      quote={asset.quote}
      amount={asset.amount}
      price={asset.price}
      date={asset.date}
      />
    );
    return (
      <div>
        <h1>CryptoKeeper</h1>
        <h2 className="text-left">Your Inventory</h2>
        <div className="row">
          {assets}
        </div>
      </div>
    );
  }
}

export default Inventory;
