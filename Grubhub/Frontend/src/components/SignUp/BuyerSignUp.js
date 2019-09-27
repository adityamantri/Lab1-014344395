import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './BuyerSignUp.css';
import { connect } from 'react-redux';
import { buyerSignUpPosts } from '../../actions/postActions';

class Login extends Component {

    createData = () => {
        return {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            password: this.props.password,
            email: this.props.email,
            error: this.props.error
        }
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (this.props.error==="Added Successfully") {
            redirectVar = <Redirect to="/login" />
        }
        return (
            <div>
                 {redirectVar} 
            
                <div class="container">
                    <div class="login-form">
                        <div class="main-div">
                            <form onSubmit={(e) => this.props.onSubmit(e,this.createData())}>
                                <h3>{this.props.error}</h3>
                                <div class="panel">
                                    <h2>Create your account</h2>
                                </div>

                                <div class="common">
                                    <div class="form-group1">
                                        <p>First Name</p>
                                        <input type="text" class="form-control" name="firstName" onChange={this.props.onChange} required /></div>
                                    <div class="form-group1">
                                        <p>Last Name</p>
                                        <input type="text" class="form-control" name="lastName" onChange={this.props.onChange} required />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <p>Email</p>
                                    <input type="email" class="form-control" name="email" onChange={this.props.onChange} required />
                                </div>

                                <div class="form-group">
                                    <p>Password</p>
                                    <input type="password" class="form-control" name="password" onChange={this.props.onChange} required />
                                </div>
                            
                            <button type="submit"  class="btn btn-primary btn-lg btn-block" ><strong>Create your account</strong></button>
                            <br />
                            </form>
                            <div class="center">
                                <span>Have an account? </span><a href="/login">Sign in</a>
                            </div>
                            <br />
                            <p class="center">By creating your Grubhub account, you agree to the Terms of Use and Privacy Policy.</p>

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = (store) => {
    console.log('storte vaslur',store);
    return {
        firstName: store.posts.firstName,
        lastName: store.posts.lastName,
        email: store.posts.email,
        password: store.posts.password,
        error: store.posts.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (e) => dispatch({ type: 'CHANGE', value: e }),
        onSubmit: (e,data) => {
            e.preventDefault();
            console.log(data);
            dispatch(buyerSignUpPosts(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);