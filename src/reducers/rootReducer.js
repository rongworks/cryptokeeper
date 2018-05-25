import {ACTIONS} from '../actions/actions.js'

var inv = localStorage.getItem('ixpkg9vu7zztGj9908JDSuusjak');
const initialState = {
  assets: JSON.parse(inv) || []
//   assets: [
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
//     {
//       id: 5,
//       market:'test_market',
//       asset:'test_asset',
//       quote:'test_quote',
//       amount: 20,
//       price: 999,
//       date: '2018-04-27'
//     },
//
//   ]
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ASSET:
      return { ...state, assets: state.assets.concat(action.payload)}
    case ACTIONS.SAVE_ASSETS:
      localStorage.setItem('ixpkg9vu7zztGj9908JDSuusjak',JSON.stringify(state.assets));
      return state;
    case ACTIONS.REMOVE_ASSETS:
        localStorage.removeItem('ixpkg9vu7zztGj9908JDSuusjak');
        return state;
    case ACTIONS.DELETE_ASSET:
    console.log('deleting '+JSON.stringify(action.payload));
        return {...state, assets: state.assets.filter(e => e.id !== action.payload.id)}
    default:
      return state;
  }
};
export default rootReducer;
