import React, { Component } from 'react';
import util from '../util';
import Modal from 'react-modal';
import Checkout from './Checkout.js';
Modal.setAppElement('#root');

export default class Basket extends Component {

    render() {
        const { cartItems, cartPromotions, } = this.props;

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
                                </li>))
                            }
                        </ul>
                    </div>

                }

                <b>Total: {util.formatCurrency(this.props.applyPromotions(cartPromotions,cartItems.reduce((a, c) => (a + this.props.getPrice(c)), 0)))}
                </b>

                  <div>
                  <button className="btn btn-primary"
                          onClick={this.props.handleOpenModal}>Checkout</button>
                  <Modal
                  isOpen={this.props.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.props.handleCloseModal}
                    className="Modal"
                    overlayClassName="Overlay">

                  <form role="form">
                    <div className="form-group">
                      <label htmlFor="Email address">Email address</label>
                      <input type="email" className="form-control" id="Email address" placeholder="Enter email" required={true} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Address">Address</label>
                      <input type="text" className="form-control" id="Address" placeholder="Address" required={true} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Credit card">Credit Card</label>
                      <input type="text" maxLength="16" className="form-control" id="Credit card detials" placeholder="Credit Card Detials" required={true}/>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                  </form>
                  <button type="submit"
                  className="btn btn-primary"
                  onClick={this.props.handleCloseModal}>Close</button>
                    </Modal>
                    </div>

              </div>
        )
    }
}
