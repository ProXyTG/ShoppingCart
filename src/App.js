import React, { Component } from 'react';
import logo from './logo.svg';
import Products from './components/Products';
import Basket from './components/Basket';
import Promotions from './components/Promotions';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], filteredProducts: [], cartItems: [], promotions: [], cartPromotions: [] };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handleAddPromotions = this.handleAddPromotions.bind(this);
    this.handleRemovePromotions = this.handleRemovePromotions.bind(this);
  }

  componentWillMount() {
    fetch("http://localhost:8000/products").then(res => res.json())
    .then(data => this.setState({
      products: data,
      filteredProducts: data
    }));
    if (localStorage.getItem('cartItems')) {
      this.setState({ cartItems: JSON.parse(localStorage.getItem('cartItems')) });
    }
  }

  componentDidMount() {
    fetch("http://localhost:8000/promotions").then(res => res.json())
    .then(data => this.setState({
      promotions: data,
    }));
    if (localStorage.getItem('cartPromotions')) {
      this.setState({ cartPromotions: JSON.parse(localStorage.getItem('cartPromotions')) });
    }
  }

  handleAddToCart(e, product) {
    this.setState(state=>{
      const cartItems = state.cartItems;
      let productAllreadyInCart= false;
      cartItems.forEach(item => {
        if(item.id===product.id){
          productAllreadyInCart = true;
          item.count++;
        }
      });
      if(!productAllreadyInCart){
        cartItems.push({...product, count:1});
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return cartItems;
    })
  }

  handleRemoveFromCart(e, item) {
    this.setState(state=>{
      const cartItems = state.cartItems.filter(elm => elm.id !== item.id);
      localStorage.setItem('cartItem', cartItems);
      return {cartItems};
    });
  }

  getPrice(item) {
    var price = 0.0;
    if(item.discount !== undefined){
      price = item.price * (item.count % item.discount.qty);
      if(item.count >= item.discount.qty){
        price += item.discount.price * (Math.floor(item.count/item.discount.qty));
      }
    }else{
        price = item.count * item.price;
    }
    console.log(price);
    return price;
  }

  handleAddPromotions (e, promotion) {
    this.setState(state=>{
      const cartPromotions = state.cartPromotions;
      let promotionAllreadyInCart= false;
      cartPromotions.forEach(item => {
        if(item.id===promotion.id){
          promotionAllreadyInCart = true;
        }
      });
      if(!promotionAllreadyInCart){
        cartPromotions.push({...promotion, count:1});
      }
      localStorage.setItem("cartPromotions", JSON.stringify(cartPromotions));
      return cartPromotions;
    })
  }

  handleRemovePromotions(e, promotion) {
    this.setState(state=>{
      const cartPromotions = state.cartPromotions.filter(elm => elm.id !== promotion.id);
      localStorage.setItem('cartPromotions', cartPromotions);
      return {cartPromotions};
    });
  }

  render() {
     return (
       <div className="container">
         <h1>Shopping-Cart</h1>
         <hr />
         <div className="row">

           <div className="col-md-9">
             <Products
             products={this.state.filteredProducts}
             handleAddToCart={this.handleAddToCart} />
           </div>

           <div className="col-md-3">
             <Basket
             getPrice={this.getPrice}
             cartItems={this.state.cartItems}
             handleRemoveFromCart={this.handleRemoveFromCart}
             products={this.state.filteredProducts}
             handleRemovePromotions = {this.handleRemovePromotions}
             cartPromotions={this.state.cartPromotions} />
            </div>

          <div className="col-md-4">
            <Promotions
            promotions={this.state.promotions}
            handleAddPromotions={this.handleAddPromotions} />
          </div>

         </div>
       </div>
     );
   }
}

export default App;
