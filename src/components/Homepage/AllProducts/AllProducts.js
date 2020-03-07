import React, { Component } from 'react';
import Auxil from '../../Hoc/Auxil';

import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'reactstrap';

export class AllProducts extends Component {

  state = {
    products: ''
  }

  componentDidMount() {
    axios.get(process.env.REACT_APP_GENERAL_PRODUCTS_URL)
    .then(response => this.setState({ products: response.data }))
    .catch(error => this.setState({ failureMessage: error.response }));
  }

  render() {
    const state = this.state;
    const products = this.state.products.products;

    return (
      <Auxil>
        {products ?
          <div className="container p-5">
            {
              state.successMessage || state.failureMessage ? 
                <Alert color={state.successMessage ? 'success' : 'danger'}>
                  {state.successMessage || state.failureMessage}
                </Alert>:
              null
            }
            <p className="lead">
              <b>Recommended Deals:</b>
            </p>
            <div className="row">
              {
                products.map(product => (
                  <div key={product._id} className="col-md-3 mb-5">
                    <NavLink to={`/products/${product._id}`}>
                      <div className="card bg-light">
                        <img src={process.env.REACT_APP_PRODUCT_PICTURES_URL + product.image}
                          alt="product" className="card-img-top" style={{ 'height': '15rem' }} />
                        <div className="card-body">
                          <h5 className="card-title">{product.title}</h5>
                          <p className="card-text">${product.price}</p>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                ))
              }
            </div>
          </div>:
          <div className="m-auto settingsSpinner">
            <h1 className="text-center display-3">
              <FontAwesomeIcon icon={faSpinner} spin />
            </h1>
          </div>
        }
      </Auxil>
    );
  }
}

export default AllProducts;
