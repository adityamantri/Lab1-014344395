import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import './Login.css'
//Define a Login Component
class Login extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username: "",
            password: "",
            authFlag: false,
            error: ""
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false,
            error: ""
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/buyer/buyerLogin', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true,
                        error: ""
                    })
                }
            }).catch(error => {
                this.setState({
                    authFlag: false,
                    error: "Hey Stranger! We don't recognize that login. Spell check your info and try again!"
                })
            });
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
                            <form >
                                <h3>{this.state.error}</h3>
                                <div class="panel">
                                    <h2>Sign in with your Grubhub account</h2>
                                </div>

                                <div class="form-group">
                                    <p>Email</p>

                                    <input type="email" class="form-control" name="username" required />
                                </div>
                                <div class="form-group">
                                    <p>Password</p>

                                    <input type="password" class="form-control" name="password" required />
                                </div>
                                <button type="submit" class="btn btn-danger btn-lg btn-block" ><strong>Sign in</strong></button>
                                <br />
                                <a class="createRoute" href="/buyerSignUp">Create your account</a>
                            </form>
                        </div>

                    </div>

                </div>
            </div >
        )
    }
}
//export Login Component
export default Login;