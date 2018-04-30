import React, { Component } from 'react';
import Asset from './asset.js'
import './inventory.css'

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {inventory: [], new_asset: {id:'',asset:'',quote:'',amount:0,price:0,date:''}, next_id: 5};
    this.clearAssets = this.clearAssets.bind(this);
  }

  componentDidMount() {
    var inv = localStorage.getItem('ixpkg9vu7zztGj9908JDSuusjak');
    if(!inv){
      alert('no data found: '+inv);
      inv = [
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
        },
        {
          id: 4,
          market:'kraken',
          asset:'eos',
          quote:'eur',
          amount: 20,
          price: 13.5000,
          date: '2018-04-27'
        },

      ]
    }
    else{
      inv = JSON.parse(inv);
    }
    this.setState({
      inventory: inv
    });
    this.saveAssets(inv);
  }

  componentWillUnmount() {

  }

  saveAssets(assets){
    localStorage.setItem('ixpkg9vu7zztGj9908JDSuusjak',JSON.stringify(assets));
    console.log('saved '+JSON.stringify(assets));
  }

  clearAssets(){
    this.setState({inventory: []});
    localStorage.removeItem('ixpkg9vu7zztGj9908JDSuusjak');
  }

  updateTrades(id,trade){
    var trades = this.state.trades;
    trades[id] = trade;
    this.setState({ trades: trades });
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    var new_asset = this.state.new_asset;
    new_asset[name] = value;
    this.setState({
      new_asset: new_asset
    });
  }

  addAsset(){
    var new_asset = this.state.new_asset;
    if(!Number(parseFloat(new_asset.price)) === new_asset.price){
      return;
    }
    else{
      new_asset.price = parseFloat(new_asset.price);
    }
    var next_id = this.state.next_id;
    new_asset.id = next_id;
    next_id++;
    console.log(new_asset);
    this.setState({inventory: this.state.inventory.concat(new_asset), new_asset: {id:'',asset:'',quote:'',amount:0,price:0,date:''}, next_id: next_id });
  }

  render() {
    //var trades = this.state.trades;
    var new_asset = this.state.new_asset;
    var assets = this.state.inventory.map( (asset, index) =>
    <Asset
      id={asset.id}
      market={asset.market}
      asset={asset.asset}
      quote={asset.quote}
      amount={asset.amount}
      price={asset.price}
      date={asset.date}
      key={asset.id}
      />
    );
    return (
      <div>
        <h1>CryptoKeeper</h1>
        <button className="btn btn-secondary float-right" onClick={this.clearAssets}>Delete</button>
        <h2 className="text-left">Your Inventory</h2>
        <form>
          <input type="text"
            placeholder="market"
            name="market"
            onChange={this.handleInputChange.bind(this)}>
          </input>
          <input type="text"
            placeholder="asset"
            name="asset"
            onChange={this.handleInputChange.bind(this)}>
          </input>
          <input type="text"
            placeholder="quote"
            name="quote"
            onChange={this.handleInputChange.bind(this)}>
          </input>
          <input type="text"
            placeholder="price"
            name="price"
            onChange={this.handleInputChange.bind(this)}>
          </input>
          <input type="text"
            placeholder="amount"
            name="amount"
            onChange={this.handleInputChange.bind(this)}>
          </input>
          <input type="text"
            placeholder="date"
            name="date"
            onChange={this.handleInputChange.bind(this)}>
          </input>
          <button type="button" onClick={this.addAsset.bind(this)}>Add</button>
        </form>
        <div className="row">
          {assets}
        </div>
        <div>{JSON.stringify(this.state)}</div>

      </div>
    );
  }
}

export default Inventory;
