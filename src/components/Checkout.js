import React, { Component } from 'react';

export default class Checkout extends Component {
  render() {
    return (
        <button onClick={() =>
          <div>
            alert("Hello! I am an alert box!!");
          </div>
        } className="btn btn-primary">Checkout</button>
    );
  }
}
