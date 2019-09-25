import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { ownerSignUpPosts } from '../../actions/postActions';
import './BuyerSignUp.css'
//Define a Login Component
class Login extends Component {

    createData = () => {
        return {
            owner_address: this.props.owner_address,
            restaurantId: this.props.buyerId,
            owner_email: this.props.owner_email,
            owner_firstName: this.props.owner_firstName,
            owner_image: this.props.owner_image,
            owner_lastName: this.props.owner_lastName,
            owner_password: this.props.owner_password,
            owner_phone: this.props.owner_phone,
            zipCode: this.props.zipCode,
            cuisine: this.props.cousine,
            restaurantImage: this.props.restaurantImage,
            restaurantName: this.props.restaurantName,
            error: this.props.error
        }
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (cookie.load('owner')) {
            redirectVar = <Redirect to="/ownerLogin" />
        }
        return (
            <div>
                {redirectVar}
                <div class="container" style={{ marginTop: "80px" }}>

                    <div class="login-form" >
                        <div class="main-div">
                            <form >
                                <h3>{this.props.error}</h3>
                                <div class="panel">
                                    <h2>Get more orders</h2>
                                    <h4> Ready to increase your takeout sales and reach new hungry customers? Become a Grubhub partner today!</h4>
                                </div>
                                <div class="common">
                                    <div class="form-group1">
                                        <p>First Name</p>

                                        <input type="text" onChange={this.props.onChange} class="form-control" name="owner_firstName" required /></div>
                                    <div class="form-group1">
                                        <p>Last Name</p>
                                        <input type="text" onChange={this.props.onChange} class="form-control" name="owner_lastName" required />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <p>Email</p>

                                    <input type="email" onChange={this.props.onChange} class="form-control" name="owner_email" required />
                                </div>
                                <div class="form-group">
                                    <p>Password</p>

                                    <input type="password" onChange={this.props.onChange} class="form-control" name="owner_password" required />
                                </div>
                                <div class="form-group">
                                    <p>Phone</p>

                                    <input type="text" onChange={this.props.onChange} class="form-control" name="owner_phone" required />
                                </div>
                                <div class="form-group">
                                    <p>Restaurant Name</p>

                                    <input type="text" onChange={this.props.onChange} class="form-control" name="restaurantName" required />
                                </div>
                                <div class="form-group">
                                    <p>Restaurant Zip Code</p>

                                    <input type="text" onChange={this.props.onChange} class="form-control" name="zipCode" required />
                                </div>
                            </form>
                            <button type="submit" onClick={() => this.props.onSubmit(this.createData())} class="btn btn-primary btn-lg btn-block" ><strong>Sign up now</strong></button>
                            <br />
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
    console.log('storte vaslur', store);
    return {

        owner_address: store.posts.owner_address,
        restaurantId: store.posts.buyerId,
        owner_email: store.posts.owner_email,
        owner_firstName: store.posts.owner_firstName,
        owner_image: store.posts.owner_image,
        owner_lastName: store.posts.owner_lastName,
        owner_password: store.posts.owner_password,
        owner_phone: store.posts.owner_phone,
        zipCode: store.posts.zipCode,
        cuisine: store.posts.cousine,
        restaurantImage: store.posts.restaurantImage,
        restaurantName: store.posts.restaurantName,
        error: store.posts.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (e) => dispatch({ type: 'CHANGE', value: e }),
        onSubmit: (data) => {
            console.log(data)
            dispatch(ownerSignUpPosts(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);