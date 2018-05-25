import React, { Component } from 'react';
import { connect } from "react-redux";

import Asset from './asset.js'
import AssetForm from './asset_form.js';
import {deleteAsset, saveAssets} from '../../actions/actions.js';

import './inventory.css';

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {inventory: [], new_asset: {id:'',asset:'',quote:'',amount:0,price:0,date:''}, next_id: 5};
    this.clearAssets = this.clearAssets.bind(this);
  }

  componentDidMount() {
    // var inv = localStorage.getItem('ixpkg9vu7zztGj9908JDSuusjak');
    // if(!inv){
    //   alert('no data found: '+inv);
    //   inv = [
    //     {
    //       id: 1,
    //       market:'kraken',
    //       asset:'eth',
    //       quote:'eur',
    //       amount: 2,
    //       price: 479.76,
    //       date: '2018-04-20'
    //     },
    //     {
    //       id: 2,
    //       market:'kraken',
    //       asset:'str',
    //       quote:'eur',
    //       amount: 60,
    //       price: 0.300000,
    //       date: '2018-04-21'
    //     },
    //     {
    //       id: 3,
    //       market:'kraken',
    //       asset:'eos',
    //       quote:'eur',
    //       amount: 10,
    //       price: 9.4499,
    //       date: '2018-04-23'
    //     },
    //     {
    //       id: 4,
    //       market:'kraken',
    //       asset:'eos',
    //       quote:'eur',
    //       amount: 20,
    //       price: 13.5000,
    //       date: '2018-04-27'
    //     },
    //
    //   ]
    // }
    // else{
    //   inv = JSON.parse(inv);
    // }
    // this.setState({
    //   inventory: inv
    // });
    // this.saveAssets(inv);
  }

  componentWillUnmount() {

  }

  // saveAssets(assets){
  //   localStorage.setItem('ixpkg9vu7zztGj9908JDSuusjak',JSON.stringify(assets));
  //   console.log('saved '+JSON.stringify(assets));
  // }

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

  saveAssets() {
    var assets = this.props.assets;
    this.props.saveAssets(assets);
  }

  render() {
    //var trades = this.state.trades;
    var inv = this.props.assets.map( (asset, index) =>
    <Asset
      id={asset.id}
      market={asset.market}
      asset={asset.asset}
      quote={asset.quote}
      amount={asset.amount}
      price={asset.price}
      date={asset.date}
      key={asset.id}
      deleteAsset={this.props.deleteAsset}
      />
    );
    return (
      <div>
        <h1>CryptoKeeper</h1>
        <button className="btn btn-secondary float-right" onClick={this.clearAssets}>Delete</button>
        <button className="btn btn-secondary float-right" onClick={this.saveAssets.bind(this)}>Save</button>
        <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#form-new-asset"
          aria-expanded="false" aria-controls="form-new-assets">
          New Asset
        </button>
        <h2 className="text-left">Your Inventory</h2>
        <AssetForm date={new Date()} />
        <div className="row">
          {inv}
        </div>
        <div>{JSON.stringify(this.state)}</div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return { assets: state.assets };
};
const mapDispatchToProps = dispatch => {
  return {
    saveAssets: assets => dispatch(saveAssets(assets)),
    deleteAsset: asset => dispatch(deleteAsset(asset))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Inventory);
