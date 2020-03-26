import React, { Component } from 'react';
import Auxil from '../Hoc/Auxil';

import axios from 'axios';
import { Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ReactStars from 'react-stars';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";

class Product extends Component {
  constructor(props) {
    super(props);

    this.productDivRef = React.createRef();

    this.state = {
      myReview: {
        title: '',
        description: '',
        rating: 0
      }
    };
  }

  handleScroll = () => {
    setTimeout(() => {
      this.productDivRef.current.scrollIntoView({ behavior: 'smooth' })
    }, 500)
  };

  componentDidMount() {
    this.props.disableAddReviewButton();

    const productId = this.props.match.params.id;
    this.props.populateProduct(productId);

    axios.get(`${process.env.REACT_APP_GENERAL_PRODUCTS_URL}/${productId}`)
    .then(response => this.setState({ product: response.data }))
    .catch(error => this.setState({ failureMessage: error.response }));
  }

  componentDidUpdate(prevProps, prevState) {
    //This first if block could be omitted.
    if (prevState.myReview.title !== this.state.myReview.title ||
      prevState.myReview.description !== this.state.myReview.description ||
      prevState.myReview.rating !== this.state.myReview.rating) {

      const myReview = this.state.myReview;

      if (myReview.title && myReview.description && myReview.rating) this.props.enableAddReviewButton();
      else this.props.disableAddReviewButton();
    }

    if (this.props.successMessage && !this.props.btnDisabled) {
      const updatedState = { ...this.state.myReview };
      updatedState.title = '';
      updatedState['description'] = '';
      updatedState.rating = 0;

      this.setState({ myReview: updatedState });
      this.handleScroll();
    }
  }

  postReview = event => {
    event.preventDefault();

    const productId = this.props.match.params.id;

    const myReview = { ...this.state.myReview };
    myReview.productId = productId;

    const axiosHeaders = {
      headers: {
        Authorization: this.props.token
      }
    };

    this.props.postReview(myReview, axiosHeaders, productId);
  };

  ratingChanged = newRating => {
    const updatedReview = { ...this.state.myReview };
    updatedReview.rating = newRating;
    this.setState({ myReview: updatedReview });
  };

  inputHandler = event => {
    const updatedReview = { ...this.state.myReview };

    updatedReview[event.target.name] = event.target.value;
    this.setState({ myReview: updatedReview });
  };

  render() {
    const myReview = this.state.myReview;
    const props = this.props;
    const product = this.props.product;

    return (
      <Auxil>
        {product ?
          <section id="product" className="addBg" ref={this.productDivRef}>
            <div className="container-fluid p-5">
              {
                props.successMessage || props.failureMessage ?
                  <Alert color={props.successMessage ? 'success' : 'danger'}>
                    {props.successMessage || props.failureMessage}
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
                <div>
                  <div className="mt-5 ml-lg-5">
                    <h4>Reviews</h4>
                    <hr />
                    <div className="reviews">
                      {
                        product ?
                          product.reviews.length ?
                            product.reviews.map(review => (
                              <div key={review._id} className="review">
                                <div className="p-3">
                                  <img src={review.owner.picture} width="75px"
                                    alt="poster" className="rounded-circle" />
                                  <p className="lead d-inline ml-3">{review.owner.name}</p>
                                  <br /><br />
                                  <ReactStars count={5} size={24}
                                    value={review.rating} color2={'#ffd700'} />

                                  <p className="ml-2 d-inline font-weight-bold">{review.title}</p>
                                  <p className="mt-3">{review.description}</p>
                                </div>
                                <hr />
                              </div>
                          )) : <p className="text-center text-muted">No reviews yet.</p>
                        : null
                      }
                      {this.props.loggedIn ?
                        <div className="card bg-light my-5 col-md-8 mx-auto">
                          <div className="card-body">
                            <h4 className="card-title">Add a Review</h4>
                            <hr />
                              <form className="form" onSubmit={this.postReview}>
                                <div className="form-group">
                                  <label htmlFor="title">Title</label>
                                  <input id="title" type="text" name="title" className="form-control"
                                    value={myReview.title} onChange={this.inputHandler} />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="description">Description</label>
                                  <textarea id="description" name="description" onChange={this.inputHandler}
                                    className="form-control" style={{ 'resize': 'none' }} value={myReview.description}></textarea>
                                </div>
                                <div className="form-group">
                                  <label>Rating</label>
                                  <ReactStars count={5} onChange={this.ratingChanged} size={24}
                                    name="rating" color2='#ffd700' className='stars' value={myReview.rating}  />
                                </div>
                                <button type="submit" className="btn btn-info" disabled={this.props.btnDisabled}>
                                  Post Review
                                </button>
                              </form>
                          </div>
                        </div>:
                        <p className={`text-muted text-center lead`}>You can login to add a review</p>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          :
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

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedUserReducer.personalDetails.name !== null &&
      state.loggedUserReducer.personalDetails.token !== null,
    token: state.loggedUserReducer.personalDetails.token,
    product: state.productReducer.product,
    successMessage: state.productReducer.successMessage,
    failureMessage: state.productReducer.failureMessage,
    btnDisabled: state.productReducer.btnDisabled
  };
};

const mapDispatchToProps = dispatch => {
  return {
    populateProduct: productId => dispatch(actions.fetchProduct(productId)),
    postReview: (review, headers, productId) => dispatch(actions.postReview(review, headers, productId)),
    enableAddReviewButton: () => dispatch(actions.enableAddReviewButton()),
    disableAddReviewButton: () => dispatch(actions.disableAddReviewButton()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
