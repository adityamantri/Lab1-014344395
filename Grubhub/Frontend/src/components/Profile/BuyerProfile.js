import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './BuyerProfile.css'
import { buyerProfilePosts, buyerCookieData } from '../../actions/postActions';
import { connect } from 'react-redux';
//Define a Login Component

let custid = null;
class BuyerProfile extends Component {

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
        if (cookie.load('buyer')) {
            custid = cookie.load('buyer').buyerId;
            this.props.onCookie();
        }
    }

    createData = () => {
        return {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email,
            password: this.props.password,
            address: this.props.address,
            image: this.props.image,
            phone: this.props.phone,
            buyerId: this.props.buyerId
        }
    }
    render() {

        let sidebar = (

            <div class="sidenav">
                <h2 class="title nav-header">Your account</h2>
                <img alt="dp" src={"http://localhost:3001/buyer/" + custid + ".jpg"} style={{ height: "200px", width: "200px" }}></img>
                <iframe name="hiddenFrame" class="hide"></iframe>
                <form action="http://localhost:3001/buyer/upload" method="post" enctype="multipart/form-data" target="hiddenFrame">
                    <input type="file" name='productImage' ></input>
                    <button type="submit">Update Profile Image</button>
                </form>
                <ul>

                    <li ><a onClick={this.myFunction4}>Profile</a></li>
                    <li ><a onClick={this.myFunction5}>Address and phone</a></li>
                </ul>
            </div>
        );
        console.log("create data function:   ", this.createData())
        //redirect based on successful login
        let redirectVar = null;
        if (cookie.load('buyer')) {
            // redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                <div class="sidenav">
                    <h2 class="title nav-header">Your account</h2>
                    <ul>
                        <li class="h6"><a href='/buyerProfile/profile'>Profile</a></li>
                        <li class="h6"><a href="/buyerProfile/address">Address and phone</a></li>
                        <li class="h6"><a href="">Past orders</a></li>
                    </ul>
                </div>

                <div >
                    <div path="/buyerProfile/profile" >
                        {sidebar}
                        <div id="myDIV4" style={{ "display": "none" }}>
                            <div class="container top-margin main " >
                                <div class="head block"></div>
                                <h5>Your Account</h5>
                                <div class="bottom-border">

                                    <div>Email</div>
                                    <p>{this.props.email}</p>
                                    {/* <input type="text" class="form-control" name="firstName" placeholder={this.props.email} required /> */}

                                    <div>Name<a onClick={this.myFunctionName} style={{ "float": "right" }}>Edit</a></div>
                                    <div id="myDIV1" style={{ "display": "none" }}>
                                        <form >
                                            <div class>

                                                <div class="form-group">

                                                    <p><h3>Edit Details</h3></p>
                                                    <div>First Name</div>

                                                    <input type="text" onChange={this.props.onChange} class="form-control" name="firstName" placeholder={this.props.firstName} required />
                                                    <br />
                                                    <div>Last Name</div>

                                                    <input type="text" onChange={this.props.onChange} class="form-control" name="lastName" placeholder={this.props.lastName} required />

                                                </div>

                                            </div>
                                        </form>
                                        <button type="button" onClick={() => this.props.onSubmit(this.createData())} class="btn btn-primary " ><strong>Update</strong></button>
                                        <br />

                                    </div>
                                    <br />

                                </div>

                                <div>Password<a onClick={this.myFunctionPass} style={{ "float": "right" }}>Edit</a></div>
                                <div id="myDIV2" style={{ "display": "none" }}>
                                    <form >
                                        <div>Enter New Password</div>
                                        <input type="password" onChange={this.props.onChange} class="form-control" name="password" required />
                                        <br />
                                    </form>
                                    <button type="button" onClick={() => this.props.onSubmit(this.createData())} class="btn btn-primary " ><strong>Update</strong></button>

                                </div>
                                <br />

                            </div>
                        </div>

                    </div>

                    <div path="/buyerProfile/address" >

                        {sidebar}
                        <div id="myDIV5" style={{ "display": "none" }}>
                            <div class="container top-margin main " >
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

                                                    <input type="text" onChange={this.props.onChange} class="form-control" name="address" placeholder={this.props.address} required />
                                                </div>
                                                <br />
                                            </div>
                                        </form>
                                        <button type="button" onClick={() => this.props.onSubmit(this.createData())} class="btn btn-primary " ><strong>Update</strong></button>
                                        <button type="button" onClick={this.myFunctionAddress} class="btn btn-default " value="cancel" ><strong>Cancel</strong></button>
                                        <br />

                                    </div>
                                    <br />

                                </div>

                                <div>Phone<a onClick={this.myFunctionPhone} style={{ "float": "right" }}>Edit</a></div>
                                <div id="myDIVPhone" style={{ "display": "none" }}>
                                    <form >
                                        <div>Enter Phone Number</div>
                                        <input type="text" onChange={this.props.onChange} placeholder={this.props.phone} class="form-control" name="phone" required />
                                        <br />
                                    </form>
                                    <button type="button" onClick={() => this.props.onSubmit(this.createData())} class="btn btn-primary " ><strong>Update</strong></button>

                                </div>
                                <br />

                            </div>
                        </div>

                    </div>
                    <button type="button" onClick={() => this.props.onSubmit(this.createData())} class="btn btn-primary " ><strong>Update</strong></button>

                </div >

            </div >


        )
    }
}
const mapStateToProps = (store) => {
    console.log('storte vaslur', store);
    return {
        firstName: store.posts.firstName,
        lastName: store.posts.lastName,
        email: store.posts.email,
        password: store.posts.password,
        address: store.posts.address,
        image: store.posts.image,
        phone: store.posts.phone,
        buyerId: store.posts.buyerId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (e) => dispatch({ type: 'CHANGE', value: e }),
        onSubmit: (data) => {
            console.log("mapDispatchToProps data:  ", data)
            dispatch(buyerProfilePosts(data));
        },
        onCookie: () => {
            console.log("mapDispatchToProps data:  ")
            dispatch(buyerCookieData());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BuyerProfile)