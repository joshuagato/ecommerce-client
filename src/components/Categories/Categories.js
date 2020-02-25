import React, { Component } from 'react';
import './Categories.scss';
import * as actions from '../../store/actions/index';
import Spinner from 'react-bootstrap/Spinner';

import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import Auxil from '../Hoc/Auxil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export class Categories extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newCategoryName: '',
      done: false
    }
  }

  componentDidMount() {
    this.props.disableAddCategoryButton();
    this.props.onFetchCategories();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.newCategoryName) this.props.enableAddCategoryButton();
    else this.props.disableAddCategoryButton();
    
    if (this.props.successMessage && !this.state.done) {
      this.props.onFetchCategories();
      this.setState({ done: true });
    }
  }

  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  addCategory = event => {
    event.preventDefault();
    this.props.onAddCategory(this.state.newCategoryName);
    
    this.setState({ done: false, newCategoryName: '' });
  }

  render() {
    return (
      <Auxil>
          {this.props.categories ?
            <section id="categories" className="addBg">
              <div className="container p-5">
                  <h4 className="display-4">Categories</h4>
                  <hr />
                    {
                      this.props.successMessage || this.props.failureMessage ? 
                        <Alert color={this.props.successMessage ? 'success' : 'danger'}>
                          {this.props.successMessage || this.props.failureMessage}
                        </Alert> :
                      null
                    }
                  <div className="list-group">
                    {
                      this.props.categories.map(category => (
                        <NavLink key={category._id} to={`/categories/${category._id}`} 
                          className="list-group-item list-group-item-action">
                            { category.name }
                        </NavLink>
                      ))
                    }
                  </div>
                  <hr style={{'marginTop': '5rem'}} />
                  <div className="card bg-light mt-5">
                    <div className="card-body">
                      <h4 className="card-title">Add New Category</h4>
                      <hr />
                      <form onSubmit={this.addCategory}>
                          <div className="form-group">
                            <label htmlFor="newCategoryName">Category</label>
                            <input id="newCategoryName" type="text" name="newCategoryName" className="form-control"
                              value={this.state.newCategoryName} onChange={this.inputHandler} />
                          </div>
                          <button type="submit" className="btn btn-success submitBtn" 
                            disabled={this.props.btnDisabled}>
                              {
                                this.props.loading ?
                                  <Auxil>
                                    <span>Loading</span>
                                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                                  </Auxil> :
                                'Add Category'
                              }
                          </button>
                      </form>
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
    btnDisabled: state.addCategoryReducer.btnDisabled,
    loading: state.addCategoryReducer.loading,
    successMessage: state.addCategoryReducer.successMessage,
    failureMessage: state.addCategoryReducer.failureMessage
  };
}

const mapDispatchToProps = dispatch => {
  return {
    enableAddCategoryButton: () => dispatch(actions.enableAddCategoryButton()), 
    disableAddCategoryButton: () => dispatch(actions.disableAddCategoryButton()),
    onFetchCategories: () => dispatch(actions.fetchCategories()),
    onAddCategory: categoryName => dispatch(actions.addCategory(categoryName))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
