import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import './Login.css'
import { connect } from 'react-redux';
import { buyerLoginPosts } from '../../actions/postActions';
//Define a Login Component
class Login extends Component {

    //submit Login handler to send a request to the node backend
    // submitLogin = (e) => {
    //     var headers = new Headers();
    //     //prevent page from refresh
    //     e.preventDefault();
    //     const data = {
    //         username: this.state.username,
    //         password: this.state.password
    //     }

    // }
    createData = () => {
        return {
            email: this.props.email,
            password: this.props.password
        }
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        console.log("  inside render------",this.createData)
        if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/buyerProfile" />
        }
        return (
            <div>
                {redirectVar}
                <div class="container">

                    <div class="login-form">
                        <div class="main-div">
                            <form >
                                <h3>{this.props.error}</h3>
                                <div class="panel">
                                    <h2>Sign in with your Grubhub account</h2>
                                </div>

                                <div class="form-group">
                                    <p>Email</p>
                                    <input type="email" onChange={this.props.onChange} class="form-control" name="email" required />
                                </div>

                                <div class="form-group">
                                    <p>Password</p>
                                    <input type="password" onChange={this.props.onChange} class="form-control" name="password" required />
                                </div>
                            </form>
                            <button type="button" onClick={() => this.props.onSubmit(this.createData())} class="btn btn-danger btn-lg btn-block" ><strong>Sign in</strong></button>
                            <br />
                            <a class="createRoute" href="/buyerSignUp">Create your account</a>

                        </div>

                    </div>

                </div>
            </div >
        )
    }
}
const mapStateToProps = (store) => {
    console.log('store value', store);
    return {
        email: store.posts.email,
        password: store.posts.password,
        error: store.posts.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (e) => dispatch({ type: 'CHANGE', value: e }),
        onSubmit: (data) => {
            console.log("mapDispatchToProps data:  ", data)
            dispatch(buyerLoginPosts(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)