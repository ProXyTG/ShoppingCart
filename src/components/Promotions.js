import React, { Component } from 'react'
import util from '../util.js';

export default class Promotions extends Component {
  render() {
    const promotionItems = this.props.promotions.map( promotion =>
      <div className ="col-md-4">
        <div className = "thumbnail text-center">
          <a href={`#${promotion.id}`} onClick={(e)=>this.props.handleAddPromotions(e, promotion)}>
            <p>
              {promotion.name}
            </p>
          </a>
          <div>
            <b>{util.formatCurrency(promotion.value)}</b>
            <button className="btn btn-primary"
              onClick={(e)=>this.props.handleAddPromotions(e, promotion)}>
              Add
            </button>
          </div>
        </div>
    </div>
    )

    return (
      <div className="row">
        {promotionItems}
      </div>
    )
  }
}
