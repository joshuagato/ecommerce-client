import React, { Component } from 'react';
import './Address.scss';
import { connect } from 'react-redux';
import Auxil from '../../Hoc/Auxil';
import Spinner from 'react-bootstrap/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export class Address extends Component {
    render() {
        const { name, email, isSeller, token } = this.props;
        return (
            <Auxil>
                {name && email && isSeller && token ?
                    <section id="address">
                        <div className="container p-5">
                            <div className="row">
                                <div className="col-lg-6 mx-auto">
                                <h4 className="display-4">My Shipping Address</h4>
                                    <hr />

                                    {/* Some message here */}
                                    
                                    <div className="card bg-light">
                                        <div className="card-body">
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="addr1" className="">Address 1</label>
                                                    <input id="addr1" type="text" name="address1" className="form-control" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="addr2" className="">Address 2</label>
                                                    <input id="addr2" type="text" name="address1" className="form-control" />
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="city">City</label>
                                                            <input id="city" name="city" className="form-control" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="state">State</label>
                                                            <input id="state" name="state" className="form-control" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="postalCode">Postal Code</label>
                                                            <input id="postalCode" name="postalCode" className="form-control" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="country">Country</label>
                                                            <input id="country" name="country" className="form-control" />
                                                        </div>
                                                        <button type="submit" className="btn btn-success btn-block" 
                                                            id="updateBtn">
                                                            {
                                                                this.props.loading ?
                                                                    <Auxil>
                                                                        <span>Loading</span>
                                                                        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                                                                    </Auxil> :
                                                                    
                                                                'Change Address'
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
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
        name: state.loginReducer.name,
        email: state.loginReducer.email,
        isSeller: state.loginReducer.isSeller,
        token: state.loginReducer.token,
    };
}

export default connect(mapStateToProps)(Address);
