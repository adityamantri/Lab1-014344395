import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

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
        axios.post('http://localhost:3001/loginOwner', data)
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
                <div class="container" style={{"marginTop":"80px" , "max-width": "420px", width:"auto"}}>

                    <div class="login-form" >
                        <div class="main-div">
                            <div class="panel">
                                <h3><strong style={{color:"red"}}>GRUBHUB</strong> FOR RESTAURANTS</h3>
                                <br/>
                            </div>

                            <div class="form-group">
                                <div>Email</div>
                                <input onChange={this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="" required/>
                            </div>
                            <div class="form-group">
                                <div>Password</div>
                                <input onChange={this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="" required/>
                            </div>
                            <div style={{"textAlign":"center"}}>
                            <button onClick={this.submitLogin}  class="btn btn-primary btn-lg btn-block">Sign in</button>
                            <h3>{this.state.error}</h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}
//export Login Component
export default Login;