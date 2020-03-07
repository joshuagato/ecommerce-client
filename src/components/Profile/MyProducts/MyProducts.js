import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import Auxil from '../../Hoc/Auxil';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export class MyProducts extends Component {

  componentDidMount() {
    this.props.onPopulateProducts();
  }

  render() {
    const { products } = this.props;
    return (
      <Auxil>
        {/* {products ? */}
        {products.length ?
          <section id="myProducts" className="addBg">
            <div className="container p-5">
              <div className="row">
                {products && !products.length ?
                  <h3 className="display-2 text-center mt-5">My Products is Empty!</h3> :
                  <div className="col-lg-8 mx-auto">
                    <h4 className="display-5">My Products</h4>
                    <div className="row">
                      <div className="offset-10 col-2 d-none d-md-block">
                        <p>
                          <small className="text-muted">Price</small>
                        </p>
                      </div>
                    </div>

                    <hr className="mt-0" />
                    {
                      products.map(product => (
                        <div key={product._id} className="product">
                          <div className="row">
                            <div className="col-4 col-md-2">
                              <NavLink to={`/products/${product._id}`}>
                                <img src={process.env.REACT_APP_PRODUCT_PICTURES_URL + product.image}
                                  alt="img" className="img-fluid img-thumbnail" />
                              </NavLink>
                            </div>
                            <div className="col-5 col-md-8">
                              <h5>
                                <NavLink to={'/products/' + product._id}>{product.title}</NavLink>
                                <p className="m-0">
                                  <small className="text-muted">{product.category.name}</small>
                                </p>
                              </h5>
                            </div>
                            <div className="col-2">
                              <h6 className="font-weight-bold text-danger">${product.price}</h6>
                            </div>
                          </div>
                          <hr />
                        </div>
                      ))
                    }
                  </div>
                }
              </div>
            </div>
          </section> :
          <div className="m-auto settingsSpinner">
            <h1 className="text-center display-3">
              <FontAwesomeIcon icon={faSpinner} spin />
            </h1>
          </div>
        }
      </Auxil>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.productsReducer.products
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onPopulateProducts: () => dispatch(actions.fetchProducts())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProducts);
