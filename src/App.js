import React, { Component } from 'react';
import Products from './components/Products';
import Basket from './components/Basket';
import Promotions from './components/Promotions';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], filteredProducts: [], cartItems: [], promotions: [], cartPromotions: [], showModal: false };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handleAddPromotions = this.handleAddPromotions.bind(this);
    this.handleRemovePromotions = this.handleRemovePromotions.bind(this);
    this.handleOpenModal= this.handleOpenModal.bind(this);
    this.handleCloseModal= this.handleCloseModal.bind(this);
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

  handleOpenModal(){
    this.setState({showModal: true});
  }

  handleCloseModal(){
    this.setState({showModal: false});
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

  applyPromotions(promotions, price) {
    let ret= price;
    promotions.forEach(item => {
        if(item.type === "-") {
          ret -= item.value;
        }
      })

      let discount = 0.0;
      promotions.forEach(item => {
        if(item.type === "%") {
          discount += item.value;
        }
      })
      ret *= (1.0-discount);
    return ret;
  }

  handleAddPromotions (e, promotion) {
    this.setState(state=>{
      let promotionAllreadyInCart= false;
      this.state.cartPromotions.forEach(item => {
        if(item.id===promotion.id){
          promotionAllreadyInCart = true;
        }
      });
      let cartPromotions = this.state.cartPromotions;

      if(!promotionAllreadyInCart){
        if(!promotion.solo) {
           this.setState({cartPromotions: [promotion] });
        }else {
           cartPromotions.push({...promotion, count:1});
        }
      }
      localStorage.setItem("cartPromotions", JSON.stringify(cartPromotions));
      console.log({cartPromotions});
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
             handleCloseModal={this.handleCloseModal}
             handleOpenModal={this.handleOpenModal}
             showModal= {this.state.showModal}
             applyPromotions= {this.applyPromotions}
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
