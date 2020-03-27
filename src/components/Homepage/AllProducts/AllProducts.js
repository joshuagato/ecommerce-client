import React, { Component } from 'react';
import './AllProducts.scss';
import Auxil from '../../Hoc/Auxil';

import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'reactstrap';
import Pagination from "react-js-pagination";

export class AllProducts extends Component {

  state = {
    products: [],
    totalProducts: '',
    activePage: 1,
  }

  componentDidMount() {
    // axios.get(process.env.REACT_APP_GENERAL_PRODUCTS_URL)
    // .then(response => this.setState({ products: response.data.products }))
    // .catch(error => this.setState({ failureMessage: error.response }));
    this.getProducts(this.state.activePage);
  }

  getProducts = pageNumber => {
    axios.get(`${process.env.REACT_APP_GENERAL_PRODUCTS_URL}?page=${pageNumber - 1}`)
      .then(response => {
        const resData = response.data;
        this.setState({ products: resData.products, totalProducts: resData.totalProducts, activePage: pageNumber })
      })
      .catch(error => error.response ? this.setState({ failureMessage: error.response.data.message }) : null );
  }

  render() {
    const state = this.state;
    const products = this.state.products;

    return (
      <Auxil>
        {products.length > 0 ?
          <div className="container p-5 all-products">
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
                        <div className="card-body nowrap">
                          <h5 className="card-title text-truncate">{product.title}</h5>
                          <p className="card-text">${product.price}</p>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                ))
              }
            </div>
            <section className='pagination'>
              <Pagination
                activePage={state.activePage}
                itemsCountPerPage={8}
                totalItemsCount={state.totalProducts}
                pageRangeDisplayed={5}
                onChange={this.getProducts.bind(this)}
                itemClass="page-item"
                linkClass="page-link" />
            </section>
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
