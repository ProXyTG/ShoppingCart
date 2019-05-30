import React, { Component } from 'react';
import logo from './logo.svg';
import Products from './components/Products';
import Basket from './components/Basket';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], filteredProducts: [], cartItems: [], promotions: [
      {name: "20%OFF", value: 20},
      {name: "5%OFF", value: 5},
      {name: "20EUROFF", value: 20}
    ] };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
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

  render() {
    let promotions = this.state.promotions.map(item => {
		  return (
			  <div key={item.name}>
				  <button className="btn btn-success">{item.name}</button>
			  </div>
		  )
	  });

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
             cartItems={this.state.cartItems}
             handleRemoveFromCart={this.handleRemoveFromCart}
             products={this.state.filteredProducts}/>

           </div>

         </div>
          <div className="row">
            <div className="col-md-12">
              <h3>Promotions</h3>
              {promotions}
            </div>
          </div>
       </div>
     );
   }
}

export default App;
