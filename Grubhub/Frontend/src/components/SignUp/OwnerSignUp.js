import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './BuyerSignUp.css'
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
        axios.post('http://localhost:3001/buyer/buyerSignUp', data)
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
                    error: "Invalid Credentials"
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
                <div class="container" style={{marginTop:"80px"}}>
                
                    <div class="login-form" >
                    <div class="main-div">
                        <form >
                            <h3>{this.state.error}</h3>
                            <div class="panel">
                                <h2>Get more orders</h2>
                                <h4> Ready to increase your takeout sales and reach new hungry customers? Become a Grubhub partner today!</h4>
                            </div>
                            <div class="common">
                            <div class="form-group1">
                                <p>First Name</p>

                                <input type="text" class="form-control" name="firstName" required /></div>
                                <div class="form-group1">
                                <p>Last Name</p>
                                <input type="text" class="form-control" name="lastName" required />
                            </div>
                            </div>
                            <div class="form-group">
                                <p>Email</p>

                                <input type="email" class="form-control" name="email" required />
                            </div>
                            <div class="form-group">
                                <p>Password</p>

                                <input type="password" class="form-control" name="password" required />
                            </div>
                            <div class="form-group">
                                <p>Phone</p>

                                <input type="number" class="form-control" name="phone" required />
                            </div>
                            <div class="form-group">
                                <p>Restaurant Name</p>

                                <input type="text" class="form-control" name="restaurantName" required />
                            </div>
                            <div class="form-group">
                                <p>Restaurant Zip Code</p>

                                <input type="number" class="form-control" name="zipCode" required />
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg btn-block" ><strong>Sign up now</strong></button>
                            <br/>
                            <div class="center">
                            <span>Have an account? </span><a  href="/login">Sign in</a>
                            </div>
                            <br/>
                            <p class="center">By creating your Grubhub account, you agree to the Terms of Use and Privacy Policy.</p>
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