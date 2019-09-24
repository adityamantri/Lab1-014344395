import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './BuyerSignUp.css';
import { connect } from 'react-redux';
import { buyerSignUpPosts } from '../../actions/postActions';
//Define a Login Component
class Login extends Component {
    
    // onChange(e) {
    //     this.setState({ [e.target.name]: e.target.value });
    // }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        //prevent page from refresh
        e.preventDefault();

        // const data = {
        //     firstName: this.state.firstName,
        //     lastName: this.state.lastName,
        //     email: this.state.email,
        //     password: this.state.password
        // }

    }



    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                {redirectVar}
                <div class="container">

                    <div class="login-form">
                        <div class="main-div">
                            <form onSubmit={()=>{this.onSubmit}}>
                                <h3>{this.state.error}</h3>
                                <div class="panel">
                                    <h2>Create your account</h2>
                                </div>

                                <div class="common">
                                    <div class="form-group1">
                                        <p>First Name</p>
                                        <input type="text" class="form-control" name="firstName" onChange={this.props.onFirstNameChange} required /></div>
                                    <div class="form-group1">
                                        <p>Last Name</p>
                                        <input type="text" class="form-control" name="lastName" onChange={this.props.onLastNameChange} required />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <p>Email</p>
                                    <input type="email" class="form-control" name="email" onChange={this.props.onEmailChange} required />
                                </div>

                                <div class="form-group">
                                    <p>Password</p>
                                    <input type="password" class="form-control" name="password" onChange={this.props.onPasswordChange} required />
                                </div>

                                <button type="submit" onChange={this.props.onSubmit} class="btn btn-primary btn-lg btn-block" ><strong>Create your account</strong></button>
                                <br />

                                <div class="center">
                                    <span>Have an account? </span><a href="/login">Sign in</a>
                                </div>
                                <br />
                                <p class="center">By creating your Grubhub account, you agree to the Terms of Use and Privacy Policy.</p>
                            </form>
                        </div>

                    </div>

                </div>
            </div >
        )
    }

}
const mapStateToProps = (state) => {
    return {
        error:state.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (e) => dispatch({ type: 'CHANGE',value:e}),
        onSubmit: (data) => {
            dispatch(buyerSignUpPosts(data))
        }
    };
};
//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(Login);