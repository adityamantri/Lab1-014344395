import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './BuyerProfile.css'
//Define a Login Component
class BuyerProfile extends Component {
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

    myFunctionName = () => {
        var x = document.getElementById("myDIV1");
        console.log("reached function myDIV1")
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    myFunctionPass = () => {
        var x = document.getElementById("myDIV2");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    myFunction4 = () => {
        var x = document.getElementById("myDIV4");
        console.log("reached function myDIV4")
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    myFunctionAddress = () => {
        var x = document.getElementById("myDIVAddress");
        console.log("reached function myDIVAddress")
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    myFunction5 = () => {
        var x = document.getElementById("myDIV5");
        console.log("reached function myDIV1")
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    myFunction6 = () => {
        var x = document.getElementById("myDIV6");
        console.log("reached function myDIV1")
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    myFunctionPhone = () => {
        var x = document.getElementById("myDIVPhone");
        console.log("reached function myDIVPhone")
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
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
        axios.post('http://localhost:3001/buyer/updateBuyer', data)
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
                <div class="sidenav">
                    <h2 class="title nav-header">Your account</h2>
                    <ul>
                        <li class="h6"><a href='/buyerProfile/profile'>Profile</a></li>
                        <li class="h6"><a href="/buyerProfile/address">Address and phone</a></li>
                        <li class="h6"><a href="">Past orders</a></li>
                    </ul>
                </div>

                <div >
                    <div path="/buyerProfile/profile" url="/buyerProfile/profile">
                        <div class="sidenav">
                            <h2 class="title nav-header">Your account</h2>
                            <ul>
                                <li ><a onClick={this.myFunction4}>Profile</a></li>
                                <li ><a onClick={this.myFunction5}>Address and phone</a></li>
                                <li ><a onClick={this.myFunction6}>Past orders</a></li>
                            </ul>
                        </div>
                        <div id="myDIV4" style={{ "display": "none" }}>
                            <form class="container top-margin main " >
                                <div class="head block"></div>
                                <h5>Your Account</h5>
                                <div class="bottom-border">
                                    <div>Name<a onClick={this.myFunctionName} style={{ "float": "right" }}>Edit</a></div>
                                    <div id="myDIV1" style={{ "display": "none" }}>
                                        <form >
                                            <div class>
                                                <div class="form-group">
                                                    <p><h3>Edit Details</h3></p>
                                                    <div>Name</div>

                                                    <input type="text" class="form-control" name="username" value="Aditya" required />
                                                </div>
                                                <div class="form-group">
                                                    <p>Address</p>

                                                    <input type="password" class="form-control" name="password" required />
                                                </div>
                                                <button type="submit" class="btn btn-primary " ><strong>Update</strong></button>
                                                <button type="submit" class="btn btn-default " ><strong>Cancel</strong></button>
                                                <br />
                                            </div>
                                        </form>
                                    </div>
                                    <br />

                                </div>

                                <div>Password<a onClick={this.myFunctionPass} style={{ "float": "right" }}>Edit</a></div>
                                <div id="myDIV2" style={{ "display": "none" }}>
                                    <form >
                                        <div>Enter New Password</div>
                                        <input type="password" class="form-control" name="password" required />
                                        <br/>
                                        <button type="submit" class="btn btn-primary " ><strong>Update</strong></button>
                                    </form>
                                </div>
                                <br />

                            </form>
                        </div>

                    </div>

                    <div path="/buyerProfile/address" url="/buyerProfile/address">

                        <div class="sidenav">
                            <h2 class="title nav-header">Your account</h2>
                            <ul>
                                <li ><a onClick={this.myFunction4}>Profile</a></li>
                                <li ><a onClick={this.myFunction5}>Address and phone</a></li>
                                <li ><a onClick={this.myFunction6}>Past orders</a></li>
                            </ul>
                        </div>
                        <div id="myDIV5" style={{ "display": "none" }}>
                            <form class="container top-margin main " >
                                <div class="head block"></div>
                                <h5>Your Account</h5>
                                <div class="bottom-border">
                                    <div>Address<a onClick={this.myFunctionAddress} style={{ "float": "right" }}>Edit</a></div>
                                    <div id="myDIVAddress" style={{ "display": "none" }}>
                                        <form >
                                            <div class>
                                                <div class="form-group">
                                                    <p><h3>Edit Details</h3></p>
                                                    <div>Address</div>

                                                    <input type="text" class="form-control" name="username" value="Aditya" required />
                                                </div>
                                                <br />
                                                <button type="submit" class="btn btn-primary " ><strong>Update</strong></button>
                                                <button type="submit" class="btn btn-default " value="cancel" ><strong>Cancel</strong></button>
                                                <br />
                                            </div>
                                        </form>
                                    </div>
                                    <br />

                                </div>

                                <div>Phone<a onClick={this.myFunctionPhone} style={{ "float": "right" }}>Edit</a></div>
                                <div id="myDIVPhone" style={{ "display": "none" }}>
                                    <form >
                                        <div>Enter Phone Number</div>
                                        <input type="text" class="form-control" name="password" required />
                                        <br />
                                        <button type="submit" class="btn btn-primary " ><strong>Update</strong></button>
                                    </form>
                                </div>
                                <br />

                            </form>
                        </div>

                    </div>
                </div >

            </div >


        )
    }
}
//export Login Component
export default BuyerProfile;