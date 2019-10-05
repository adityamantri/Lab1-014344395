import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './Login.css';
import { connect } from 'react-redux';
import { buyerLoginPosts } from '../../actions/postActions';
//Define a Login Component
class Login extends Component {

    createData = () => {
        return {
            email: this.props.email,
            password: this.props.password,
            error:this.props.error
        }
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        console.log("  inside render------",this.createData)
        if (cookie.load('buyer')) {
            redirectVar = <Redirect to="/searchBar" />
        }
        return (
            <div>
                {redirectVar}
                <div class="container">

                    <div class="login-form">
                        <div class="main-div">
                            <form onSubmit={(e) => this.props.onSubmit(e,this.createData())}>
                                
                                <div class="panel">
                                <h4>{this.props.error}</h4>
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
                            
                            <button type="submit"  class="btn btn-danger btn-lg btn-block" ><strong>Sign in</strong></button>
                            <br />
                            </form>
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
        onSubmit: (e,data) => {
            e.preventDefault();
            console.log("mapDispatchToProps data:  ", data)
            dispatch(buyerLoginPosts(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)