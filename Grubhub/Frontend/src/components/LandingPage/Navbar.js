import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';

//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.clear();
        axios.get('http://localhost:3001/logout')
            .then((response) => {
                //Remove the cookies

                cookie.remove('cookie', { path: '/' })
            });
    }
    render() {
        //if Cookie is set render Logout Button
        let navLogin = null;
        if (cookie.load('cookie')) {
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        } else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        
        return (
            <div>
                {/* {redirectVar} */}
                <nav class="navbar navbar-default navbar-fixed-top">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" style={{ color: 'red' }}> <strong>GRUBHUB</strong></a>
                        </div>

                        <div class="navbar-collapse navbar-right">
                            <ul class="nav navbar-nav">
                                
                                <li class="nav-item">
                                    <a class="nav-link" href="">Logout</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="" id="navbardrop" data-toggle="dropdown">Hi link<span class="caret"></span></a>
                                    <ul class="dropdown-menu">
                                        <li><a href=""> Past order</a></li>
                                        <li><a href="/buyerProfile">Account</a></li>
                                        <li><a href="">Upcoming orders</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        {navLogin}
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;