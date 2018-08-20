import React, { Component } from 'react';
import { connect } from "react-redux";
import {addAsset} from '../../actions/actions.js'
import DatePicker from 'react-date-picker'

class AssetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      market:props.market,
      asset:props.asset,
      quote:props.quote,
      amount: props.amount,
      price: props.price,
      date: props.date,
      price_current: 0,
      profit_eur_current: 0,
      profit_perc_current: 0,
      profit_perc_d: 0,
      profit_eur_d: 0
    };
  }

  render(){
    return (
      <div id="form-new-asset" className="collapse p-4">
        <form>
        <div className="row">
        <div className="col">
          <input type="text"
            className="form-control"
            placeholder="market"
            name="market"
            onChange={this.handleInputChange.bind(this)}>
          </input>
          <input type="text"
            className="form-control"
            placeholder="asset"
            name="asset"
            onChange={this.handleInputChange.bind(this)}>
          </input>
          <input type="text"
            className="form-control"
            placeholder="quote"
            name="quote"
            onChange={this.handleInputChange.bind(this)}>
          </input>
        </div>
        <div className="col">
          <input type="text"
            className="form-control"
            placeholder="price"
            name="price"
            onChange={this.handleInputChange.bind(this)}>
          </input>
          <input type="text"
            className="form-control"
            placeholder="amount"
            name="amount"
            onChange={this.handleInputChange.bind(this)}>
          </input>
          <input type="text"
            className="form-control"
            placeholder="date"
            name="date"
            onChange={this.handleInputChange.bind(this)}>
          </input>

        </div>
        </div>
        <div className="row justify-left m-2">
          <button type="button" className="btn btn-primary" onClick={this.submit.bind(this)}>Add Asset</button>
        </div>
        </form>

        </div>
    );
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;


    this.setState({
      [name]: value
    });
  }

  submit(){
    var new_asset = this.state;
    if(!Number(parseFloat(new_asset.price)) === new_asset.price){
      return;
    }
    else{
      new_asset.price = parseFloat(new_asset.price);
    }
    var ass = this.state;
    var next_id = this.state.next_id;
    new_asset.id = next_id;
    next_id++;
    console.log(new_asset);
    //this.setState({inventory: this.state.inventory.concat(new_asset), new_asset: {id:'',asset:'',quote:'',amount:0,price:0,date:''}, next_id: next_id });
    this.props.addAsset({
      id: ass.id,
      market: this.state.market,
      asset: this.state.asset,
      quote: this.state.quote,
      amount: this.state.amount,
      price: this.state.price,
      date: this.state.date });
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addAsset: asset => dispatch(addAsset(asset))
  };
};

export default connect(null, mapDispatchToProps)(AssetForm);
