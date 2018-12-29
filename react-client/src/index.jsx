import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Price from './components/price.jsx';
import Shipping from './components/shipping.jsx';
import Stock from './components/stock.jsx';
import SoldBy from './components/soldBy.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct : {},
      currentUser : {},
      product : {},
      productId : 39
    }
    this.getProduct = this.getProduct.bind(this);
  }

  getProduct(id) {
    axios.get(`http://localhost:3016/listing/${id}`)
    .then(res => {
      this.setState({
        product : res.data,
        currentUser : res.data[0],
        currentProduct : res.data[1]
      })
    })
    .catch(err => {
      console.error(err);
    })

  }

  componentDidMount() {
    this.getProduct(this.state.productId);
  }


  render() {
    return (
      <div className="mainComponent">
        <div className="priceComponent">
        <Price price={this.state.currentProduct.price} sale={this.state.currentProduct.sale} salePercent={this.state.currentProduct.salePercent} quantity={this.state.currentProduct.quantity} />
        </div>
        {(!this.state.currentProduct.sale ?
        <div>
          <div className="shippingComponent">
            <Shipping shippingDetails={this.state.currentProduct.details}/>
          </div>

          <div className="stockComponent">
            <Stock quantity={this.state.currentProduct.quantity} />
            <SoldBy seller={this.state.currentProduct.soldBy} fba={this.state.currentProduct.fullfilledByAmazon} />
          </div>
        </div>
          : null )}
      </div>
    )
  }
}



ReactDOM.render(<App />, document.getElementById('app'));
