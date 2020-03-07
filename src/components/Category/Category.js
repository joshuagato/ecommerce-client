import React, { Component } from 'react';
import axios from 'axios';
import Auxil from '../Hoc/Auxil';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'reactstrap';
import Pagination from "react-js-pagination";

export class Category extends Component {

  state = {
    category: '',
    successMessage: '',
    failureMessage: '',
    page: 1,
    activePage: 1
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = pageNumber => {
    const categoryId = this.props.match.params.id;

    axios.get(`${process.env.REACT_APP_CATEGORIES_URL}/${categoryId}?page=${pageNumber - 1}`)
    .then(response => this.setState({ category: response.data, activePage: pageNumber }))
    .catch(error => this.setState({ failureMessage: error.response }));
  }

  lower = () => {
    return 10 * (this.state.page - 1) + 1;
  }

  upper = () => {
    return Math.min(2 * this.state.page, this.state.category.totalProducts);
  }

  render() {
    const state = this.state;

    return (
      <Auxil>
        {state.category ?
          <section id="category" className="addBg">
            <div className="container p-3 p-md-5">
              {
                state.successMessage || state.failureMessage ? 
                  <Alert color={state.successMessage ? 'success' : 'danger'}>
                    {state.successMessage || state.failureMessage}
                  </Alert> :
                null
              }
              {state.category && !state.category.products.length ?
                <h3 className="text-center mt-2">No products inside this category.</h3> :
                <Auxil >
                  <div>
                    <p>{this.lower()}-{this.upper()} of {state.category.totalProducts} products in {state.category.categoryName}</p>
                    <hr />
                    {
                      state.category.products.map(product => (
                        <Auxil key={product._id}>
                          <div className="product p-2">
                            <div className="row">
                              <div className="col-5 col-md-2">
                                <NavLink to={`/products/${product._id}`}>
                                  <img src={`${process.env.REACT_APP_PRODUCT_PICTURES_URL}${product.image}`}
                                    alt="productImage" className="img-fluid img-thmbnail" />
                                </NavLink>
                              </div>
                              <div className="col-5 col-md-8">
                                <div className="row">
                                  <div className="col-12 col-md-6">
                                    <h5>
                                      <NavLink to={`/products/${product._id}`}>{product.title}</NavLink>
                                    </h5>
                                    <p>
                                      <small className="text-muted">{product.category.name}</small>
                                    </p>
                                    <p>${product.price}</p>
                                  </div>
                                    <div className="col-md-6"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr />
                        </Auxil>
                      ))
                    }
                  </div>
                  <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={2}
                    totalItemsCount={state.category.totalProducts}
                    pageRangeDisplayed={5}
                    onChange={this.getProducts.bind(this)}
                    itemClass="page-item"
                    linkClass="page-link" />
                </Auxil>
              }
            </div>
          </section> :
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

export default Category;
