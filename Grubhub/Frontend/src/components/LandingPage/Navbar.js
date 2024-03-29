import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('buyer');
        cookie.remove('owner');

    }
    render() {
        //if Cookie is set render Logout Button
        let navLogin = null;
        let name = null;
        let rest = null;
        let redirectVar=null;


        if (cookie.load('buyer')) {
            name = 'buyer'
        } else if (cookie.load('owner')) {
            name = 'owner';
            rest = (<span>FOR RESTAURANTS</span>)
        }else{
            
            // redirectVar=(
            //  <Redirect to= '/startPage'
            //  />)
             console.log("redirectvar", redirectVar)
        }
        if (cookie.load('buyer')) {
            name = cookie.load(name).firstName;
            console.log("Able to read cookie", name);
            navLogin = (

                <div class="navbar-collapse navbar-right">
                    <ul class="nav navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="" id="navbardrop" data-toggle="dropdown">Hi, {name}!<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="/pastOrder"> Past order</a></li>
                                <li><a href="/buyerProfile">Account</a></li>
                                <li><a href="/searchBar">Search</a></li>
                                <li><a href="/upcomingOrders">Upcoming orders</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/startPage" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                    </ul>
                </div>
            );
        } else if (cookie.load('owner')) {
            rest = (<span>FOR RESTAURANTS</span>)
            name = cookie.load(name).owner_firstName;
            console.log("Able to read cookie", name);
            navLogin = (

                <div class="navbar-collapse navbar-right">
                    <ul class="nav navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="" id="navbardrop" data-toggle="dropdown">Hi, {name}!<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="/ownerProfile">Account</a></li>
                                <li><a href="/section">Section</a></li>
                                <li><a href="/addItem">Menu</a></li>
                                <li><a href="/ownerPastOrder"> Past Order</a></li>
                                <li><a href="/manageOrder"> Manage Order</a></li>

                            </ul>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                    </ul>
                </div>
            );

        } else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/ownerLogin"><span class="glyphicon glyphicon-log-in"></span> Owner Login</Link></li>
                    <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }

        return (
            <div>
                {redirectVar}
                <nav class="navbar navbar-default navbar-fixed-top">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" style={{ color: 'red' }}> <strong>GRUBHUB {rest}</strong></a>
                        </div>
                        {navLogin}
                    </div>
                </nav>
                
            </div>
        )
    }
}

export default Navbar;