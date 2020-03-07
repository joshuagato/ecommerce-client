import React, { Component } from 'react';
import Auxil from '../Hoc/Auxil';

import axios from 'axios';
import { Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export class Product extends Component {

  state = {
    product: '',
    successMessage: '',
    failureMessage: ''
  }

  componentDidMount() {
    const categoryId = this.props.match.params.id;

    axios.get(`${process.env.REACT_APP_GENERAL_PRODUCTS_URL}/${categoryId}`)
    .then(response => this.setState({ product: response.data }))
    .catch(error => this.setState({ failureMessage: error.response }));
  }

  render() {
    const state = this.state;
    const product = this.state.product.product;

    return (
      <Auxil>
        {product ?
          <section id="product" className="addBg">
            <div className="container-fluid p-5">
              {
                state.successMessage || state.failureMessage ? 
                  <Alert color={state.successMessage ? 'success' : 'danger'}>
                    {state.successMessage || state.failureMessage}
                  </Alert> :
                null
              }
              <div>
                <div className="row">
                  <div className="col-lg-4">
                    <img src={`${process.env.REACT_APP_PRODUCT_PICTURES_URL}${product.image}`}
                      alt="productImage" className="img-fluid img-thmbnail" />
                  </div>
                  <div className="col-lg-5">
                    <div className="row">
                      <div className="col-6">
                        <h4>{product.title}</h4>
                        <p className="m-0">
                          <small>by {product.owner.name}</small>
                        </p>
                        <p className="m-0">
                          <small className="text-muted">{product.category.name}</small>
                        </p>
                      </div>
                      <div className="col-6"></div>
                    </div>
                    <hr />
                    <p className="lead">{product.description}</p>
                  </div>
                  <div className="col-lg-3">
                    <div className="card bg-light">
                      <div className="card-body">
                        <h5 className="card-title">Price: ${product.price}</h5>
                        <br /><br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>:
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

export default Product;
