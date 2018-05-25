# CryptoKeeper

A simple ReactJS demo app for watching your cryptocurrency rise & shine (hopefully)

_This is a work in progress_

## Description

This app currently has 2 features:

* Manage an Inventory containing your assets
  * Show your assets (currency, market, value on purchase date, amount, ..)
  * Add new Assets or remove them
* Track the profit of your assets
  * Updating assets from https://cryptowatch.de/ API
  * See development/profit for the last 24 hours per asset
  * See the value and development since purchase date per asset
* Your inventory is currently stored on localStorage, so deleting the cookies breaks the inventory


## Usage

* npm install
* npm start   

## TODO

* New Asset form is buggy
  * needs a datepicker
  * needs better layout
* No way to persist data (partially intended)
  * maybe load/save json files  
