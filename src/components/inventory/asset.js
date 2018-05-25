import React, { Component } from 'react';

class Asset extends Component {
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
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    //this.update();
    //var intid = setInterval(this.update.bind(this),60000);
    //this.setState({intervalId: intid});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  update(){
    var api_url = 'https://cors.io/?https://api.cryptowat.ch/markets/'+this.state.market+'/'+this.state.asset+this.state.quote+'/summary';
    console.log('Get trades for'+this.state.asset+' at '+api_url);
    // https://api.cryptowat.ch/markets/gdax/btcusd/summary

    fetch(api_url)
        .then(response => {return response.json()} )
        .then(data => {
          console.log(data.result)
          var price_asset = this.state.price
          var price_now = data.result.price.last;
          var prof_eur_now = (price_now - price_asset);
          var prof_eur_d = data.result.price.change.absolute;
          var prof_perc_d = data.result.price.change.percentage;
          var prof_perc_current = (prof_eur_now/price_now);
          this.setState(
            {
              price_current: price_now,
              profit_eur_current: prof_eur_now,
              profit_perc_current: prof_perc_current,
              profit_eur_d: prof_eur_d,
              profit_perc_d: prof_perc_d
            }
          );
        })
        .catch(error => console.log(error) );
  }

  delete(){
    var asset = this.state;
    this.props.deleteAsset(asset);
  }
  render() {
    var profit_now_eur = this.state.profit_eur_current.toFixed(2);
    var profit_now_perc = this.state.profit_perc_current.toFixed(2);
    var price_now = this.state.price_current.toFixed(2);
    var amount = this.state.amount;
    var profit_d_eur = this.state.profit_eur_d.toFixed(2);
    var profit_d_perc = this.state.profit_perc_d.toFixed(2);


    var badge_class_now = (profit_now_perc > 0 ? 'badge badge-success':'badge badge-danger');
    var prefix_now = profit_now_perc >= 0 ? '+' : '-';
    var badge_class_d = (profit_d_perc > 0 ? 'badge badge-success':'badge badge-danger');
    var prefix_d = profit_d_perc >= 0 ? '+' : '-';

    return (
      <div className="col asset" key={this.state.id}>
        <div className="asset-header">
          <a title="show on cryptowatch"
             className="btn btn-sm btn-info float-right"
             href={"https://cryptowatch.de/markets/"+this.state.market+"/"+this.state.asset+"/"+this.state.quote}
             target="_blank">
             {this.state.market}
             </a>
          <p className="lead asset-title">#{this.state.id} {this.state.asset} : {this.state.quote} </p>
        </div>
        <div className="inv text-left">
          <p><span className="badge badge-secondary">{this.state.date}</span></p>
          <span className={'float-right '+badge_class_now}>{prefix_now} {profit_now_eur}&euro; / {(profit_now_perc*10).toFixed(2)}%</span>
          <p>  &#9921; {this.state.amount} x {this.state.price.toFixed(2)} &euro; </p>
          <span className={'float-right '+badge_class_now}>{prefix_now} {profit_now_eur*amount}&euro;</span>
          <p> = {(this.state.price*this.state.amount).toFixed(2)} &euro;</p>
          <hr/>
        </div>
        <div className="trade text-left">
          <p><span className="badge badge-secondary">{new Date(Date.now()).toLocaleString()}</span></p>
          <span className={'float-right '+badge_class_d}>{prefix_d} {profit_d_eur}&euro; / {(profit_d_perc*10).toFixed(2)}%</span>
          <p> &#8645; {amount} * {price_now}&euro; </p>
          <span className={'float-right '+badge_class_d}>{prefix_d} {profit_d_eur*amount}&euro;</span>
          <p> =  {price_now*amount}&euro;</p>
          <hr />
        </div>
        <div className="actions">
          <button className="btn btn-secondary" onClick={this.update}>Update</button>
          <button className="btn btn-secondary" onClick={this.delete.bind(this)}>Remove</button>
        </div>
      </div>
    );
  }
}

  export default Asset;
