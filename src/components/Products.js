import React, { Component } from 'react'
import util from '../util.js';

export default class Products extends Component {
  render() {
    const productItems = this.props.products.map( product =>
      <div key={product.title} className ="col-md-4">
        <div className = "thumbnail text-center">
          <a href={`#${product.id}`} onClick={(e)=>this.props.handleAddToCart(e, product)}>
            <p>
              {product.title}
            </p>
          </a>
          <div className="align-butons-and-price">
            <b>{util.formatCurrency(product.price)}$</b>
            <button className="btn btn-primary"
              onClick={(e)=>this.props.handleAddToCart(e, product)}>
              Add To Cart
            </button>
          </div>
        </div>
    </div>
    )

    return (
      <div className="row">
        {productItems}
      </div>
    )
  }
}
