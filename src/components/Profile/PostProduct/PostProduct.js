import React, { Component } from 'react';
import './PostProduct.scss';

import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'reactstrap';

import Auxil from '../../Hoc/Auxil';
import * as actions from '../../../store/actions/index';

export class PostProduct extends Component {

  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
    this.postProductRef = React.createRef();

    this.state = {
      title: '',
      price: 0,
      categoryId: '',
      description: '',
      product_picture: ''
    }
  }

  handleScroll = () => {
    setTimeout(() => {
      this.postProductRef.current.scrollIntoView({ behavior: 'smooth' })
    }, 500);

    setTimeout(() => this.props.clearsuccessMessage(), 5000);
  };

  componentDidMount() {
    this.props.onFetchCategories();    

    this.props.disableAddProductButton();
  }

  componentDidUpdate() {
    const state = this.state;

    if(state.title && state.price && state.categoryId && state.description && state.product_picture)
      this.props.enableAddProductButton();
    else
      this.props.disableAddProductButton();
      
    if (this.props.successMessage && !this.props.btnDisabled) {
      this.setState({ title: '', price: 0, categoryId: '', description: '', product_picture: '' });
      this.handleScroll();
    }
  }

  inputHandler = event => {
    const value = event.target.type === 'file' ? event.target.files[0] : event.target.value;

    this.setState({ [event.target.name]: value });
  }

  createProduct = event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('price', this.state.price);
    formData.append('categoryId', this.state.categoryId);
    formData.append('description', this.state.description);
    formData.append('product_picture', this.state.product_picture);

    this.props.onAddProduct(formData);
  };

  // However, the label of that input field can be styled as a button...and id to htmlFor must be set for
  // the click the trigger the file select window
  triggerInputFile = () => {
    this.fileInput.click();
  }
  
  render() {
    return (
      <Auxil>
        {this.props.categories ?
          <section className="postProduct" ref={this.postProductRef}>
            <div className="container p-5">
              <div className="row">
                <div className="col-lg-6 mx-auto">
                  <h4 className="display-5">Post a Product for Sale</h4>
                  <hr />
                  {
                    this.props.successMessage || this.props.failureMessage ? 
                      <Alert color={this.props.successMessage ? 'success' : 'danger'}>
                        {this.props.successMessage || this.props.failureMessage}
                      </Alert> :
                    null
                  }
                  <div className="card bg-light">
                    <div className="card-body">
                      <form onSubmit={this.createProduct}>
                        <div className="form-group">
                          <label htmlFor="title" className="form-control-label">Title</label>
                          <input id="title" type="text" name="title" className="form-control" 
                            onChange={this.inputHandler} value={this.state.title} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="price" className="form-control-label">Price</label>
                          <input id="price" type="number" name="price" className="form-control" 
                            onChange={this.inputHandler} value={this.state.price} step={0.01} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="categoryId" className="form-control-label">Category</label>
                          <select id="categoryId" name="categoryId" className="custom-select"
                            value={this.state.categoryId} onChange={this.inputHandler} >
                            {
                              this.props.categories.map(category => (
                                <option key={category._id} value={category._id}>
                                  { category.name }
                                </option>
                              ))
                            }
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="description" className="form-control-label">Description</label>
                          <textarea id="description" type="description" rows="5"
                            name="description" className="form-control" 
                              onChange={this.inputHandler} value={this.state.description} 
                                style={{ 'resize': 'none' }}>
                          </textarea>
                        </div>
                        <div className="form-group">
                          {/* <label htmlFor="file" className="form-control-label">Upload Images */}
                            <input id="file" type="file" name="product_picture" className="form-control-file" 
                              ref={fileInput => this.fileInput = fileInput} style={{ 'display': 'none' }}
                                accept="image/*" onChange={this.inputHandler} 
                                  defaultValue={this.state.product_picture} />
                            <button type="button" onClick={this.triggerInputFile} className="mx-auto image-upload" 
                              style={{ 'display': 'block' }}>
                                Click to Upload Image</button>
                          {/* </label> */}
                        </div>
                        <button type="submit" className="btn btn-success btn-block submitBtn"
                          disabled={this.props.btnDisabled}>
                            {
                              this.props.loading ?
                                <Auxil>
                                  <span>Loading</span>
                                  <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                                </Auxil> :
                              'Create Product'
                            }
                          </button>
                      </form>
                    </div>
                  </div>
                </div>
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
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.addCategoryReducer.categories,
    btnDisabled: state.addProductReducer.btnDisabled,
    loading: state.addProductReducer.loading,
    successMessage: state.addProductReducer.successMessage,
    failureMessage: state.addProductReducer.failureMessage
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchCategories: () => dispatch(actions.fetchCategories()),
    enableAddProductButton: () => dispatch(actions.enableAddProductButton()), 
    disableAddProductButton: () => dispatch(actions.disableAddProductButton()),
    onAddProduct: inputData => dispatch(actions.addProduct(inputData)),
    clearsuccessMessage: () => dispatch(actions.clearsuccessMessage())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostProduct);
