import React, { Component } from 'react';
import Auxil from '../Hoc/Auxil';

import axios from 'axios';
import { Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import ReactStars from 'react-rating-stars-component';
import StarRatings from 'react-star-ratings';

export class Product extends Component {

  state = {
    product: '',
    successMessage: '',
    failureMessage: '',
    myReview: {
      title: '',
      description: '',
      rating: ''
    },
    btnDisabled: true
  }

  componentDidMount() {
    const productId = this.props.match.params.id;

    // this.setState({ btnDisabled: true });

    axios.get(`${process.env.REACT_APP_GENERAL_PRODUCTS_URL}/${productId}`)
    .then(response => this.setState({ product: response.data }))
    .catch(error => this.setState({ failureMessage: error.response }));
  }

  componentDidUpdate() {
    const myReview = this.state.myReview;

    console.log(myReview.title)
    console.log(myReview.description)
    console.log(myReview.rating)

    if (myReview.rating) {
      
    }

    if (myReview.title && myReview.description && myReview.rating)
      this.setState({ btnDisabled: false });
    // else
      // this.setState({ btnDisabled: true });
  }

  postReview = () => {
    this.setState({ btnDisabled: true });
    
    axios.post(process.env.REACT_APP_PRODUCT_REVIEW_URL, this.state.myReview)
    .then(response => this.setState({ successMessage: response.data.message }))
    .catch(error => this.setState({ failureMessage: error.response }));
  }

  ratingChanged = newRating => {
    console.log(newRating);
  }

  inputHandler = (event, name) => {
    console.log(event);
    if (name) console.log(name)
    const updatedReview = { ...this.state.myReview };
    
    if (event.target) {
      updatedReview[event.target.name] = event.target.value;
      this.setState({ myReview: updatedReview });
    } else if (name) {
      updatedReview['rating'] = event;
      this.setState({ myReview: updatedReview });
    }
    
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
                                  {/* <ReactStars count={5} size={24}
                                    value={review.rating} color2={'#ffd700'} /> */}
                                    <StarRatings rating={review.rating} starRatedColor="blue"
                                      starDimension="24px" numberOfStars={5} name='rating' />

                                  <p className="ml-2 d-inline font-weight-bold">{review.title}</p>
                                  <p className="mt-3">{review.description}</p>
                                </div>
                                <hr />
                              </div>
                          )) : <p className="text-center text-muted">No reviews yet.</p>
                        : null
                      }
                      <div className="card bg-light my-5 col-md-8 mx-auto">
                        <div className="card-body">
                          <h4 className="card-title">Add a Review</h4>
                          <hr />
                          <form className="form" onSubmit={this.postReview}>
                            <div className="form-group">
                              <label htmlFor="title">Title</label>
                              <input id="title" type="text" name="title" className="form-control" 
                                onChange={this.inputHandler} />
                            </div>
                            <div className="form-group">
                              <label htmlFor="description">Description</label>
                              <textarea id="description" name="description" onChange={this.inputHandler}
                               className="form-control" style={{ 'resize': 'none' }}></textarea>
                            </div>
                            <div className="form-group">
                              <label>Rating</label>
                              {/* <ReactStars count={5} onChange={this.inputHandler} size={24}
                                name="rating" color2='#ffd700' className='stars' /> */}
                                <StarRatings starRatedColor="blue" starDimension="24px"
                                  changeRating={this.inputHandler} numberOfStars={5} name='rating' />
                            </div>
                            <button type="submit" className="btn btn-info" disabled={this.state.btnDisabled}>
                              Post Review
                            </button>
                          </form>
                        </div>
                      </div>
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

export default Product;
