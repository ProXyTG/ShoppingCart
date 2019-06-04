import React, { Component } from 'react';
import util from '../util';
import Checkout from './Checkout.js';

export default class Basket extends Component {

    render() {
        const { cartItems, cartPromotions } = this.props;

        return (
            <div className="alert alert-info">
                {cartItems.length === 0
                    ? "Basket is empty   " :
                    <div>You have {cartItems.length} items in the basket. <hr /></div>
                }
                {cartItems.length > 0 &&
                    <div>
                        <ul style={{ marginLeft: -25 }}>
                            {cartItems.map(item => (
                                <li key={item.id}>
                                    <b>{item.title}</b>
                                    <button style={{ float: 'right' }} className="btn btn-danger btn-xs"
                                        onClick={(e) => this.props.handleRemoveFromCart(e, item)}>X</button>
                                    <br />
                                    {item.count} X {util.formatCurrency(item.price)}
                                </li>))
                            }
                        </ul>
                    </div>

                }

                {cartPromotions.length === 0
                    ? "No Promotions   " :
                    <div>You have {cartPromotions.length} promotion in the basket. <hr /></div>
                }
                {cartPromotions.length > 0 &&
                    <div>
                        <ul style={{ marginLeft: -25 }}>
                            {cartPromotions.map(item => (
                                <li key={item.id}>
                                    <b>{item.name}</b>
                                    <button style={{ float: 'right' }} className="btn btn-danger btn-xs"
                                        onClick={(e) => this.props.handleRemovePromotions(e, item)}>X</button>
                                    <br />
                                    {item.count} X {util.formatCurrency(item.value)}
                                </li>))
                            }
                        </ul>
                    </div>

                }

                <b>Total: {util.formatCurrency(cartItems.reduce((a, c) => (a + this.props.getPrice(c)), 0))}
                </b>
                <button onClick={() =>
                  }
                  className="btn btn-primary">Checkout</button>
            </div>
        )
    }
}
