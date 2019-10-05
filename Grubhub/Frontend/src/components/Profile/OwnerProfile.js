import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './BuyerProfile.css'
import { ownerProfilePosts, ownerCookieData } from '../../actions/postActions';
import { connect } from 'react-redux';
//Define a Login Component
class OwnerProfile extends Component {

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

    myFunction7 = () => {
        var x = document.getElementById("myDIV7");
        console.log("reached function myDIV7")
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.props.onCookie();
    }

    createData = () => {
        return {
            owner_firstName: this.props.owner_firstName,
            owner_lastName: this.props.owner_lastName,
            owner_email: this.props.owner_email,
            owner_password: this.props.owner_password,
            owner_address: this.props.owner_address,
            owner_image: this.props.owner_image,
            owner_phone: this.props.owner_phone,
            restaurantId: this.props.restaurantId,
            restaurantName: this.props.restaurantName,
            zipCode: this.props.zipCode,
            cuisine: this.props.cuisine
        }
    }
    render() {

        let sidebar = (

            <div class="sidenav">
                <h2 class="title nav-header">Your account</h2>
                <img alt="dp"src={"http://localhost:3001/owner/"+cookie.load('owner').restaurantId+".jpg"} style={{height:"200px",width:"200px"}}></img>
                <iframe name="hiddenFrame" class="hide"></iframe>
                <form action="http://localhost:3001/owner/upload" method="post" enctype="multipart/form-data" target="hiddenFrame">
                    <input type="file" name='productImage' ></input>
                    <button type="submit">Update Profile Image</button>
                </form>
                <ul>
                    {/* <img src=""></img> */}
                    <li ><a onClick={this.myFunction4}>Profile</a></li>
                    <li ><a onClick={this.myFunction5}>Address and owner_phone</a></li>
                    <li ><a onClick={this.myFunction7}>Restaurant Details</a></li>
                </ul>
            </div>
        );
        console.log("create data function:   ", this.createData())
        //redirect based on successful login
        let redirectVar = null;
        if (!cookie.load('owner')) {
             redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                {sidebar}
{redirectVar}
                <div >
                    <div path="/ownerProfile/profile" >
                        {sidebar}
                        <div id="myDIV4" style={{ "display": "none" }}>
                            <div class="container top-margin main " >
                                <div class="head block"></div>
                                <h5>Your Account</h5>
                                <div class="bottom-border">
                                    <div>Email</div>
                                    <p>{this.props.owner_email}</p>
                                    {/* <input type="text" class="form-control" name="owner_firstName" placeholder={this.props.owner_email} required /> */}

                                    <div>Name<a onClick={this.myFunctionName} style={{ "float": "right" }}>Edit</a></div>
                                    <div id="myDIV1" style={{ "display": "none" }}>
                                        <form >
                                            <div class>

                                                <div class="form-group">

                                                <h3> <p>Edit Details</p></h3>
                                                {/* <input type="file"></input> */}
                                                    <div>First Name</div>

                                                    <input type="text" onChange={this.props.onChange} class="form-control" name="owner_firstName" placeholder={this.props.owner_firstName} required />
                                                    <br />
                                                    <div>Last Name</div>

                                                    <input type="text" onChange={this.props.onChange} class="form-control" name="owner_lastName" placeholder={this.props.owner_lastName} required />

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
                                        <input type="owner_password" onChange={this.props.onChange} class="form-control" name="owner_password" required />
                                        <br />
                                    </form>
                                    <button type="button" onClick={() => this.props.onSubmit(this.createData())} class="btn btn-primary " ><strong>Update</strong></button>

                                </div>
                                <br />

                            </div>
                        </div>

                    </div>

                    <div path="/ownerProfile/owner_address" >

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
                                                <h3><p>Edit Details</p></h3>
                                                    <div>Address</div>

                                                    <input type="text" onChange={this.props.onChange} class="form-control" name="owner_address" placeholder={this.props.owner_address} required />
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
                                        <input type="text" onChange={this.props.onChange} placeholder={this.props.owner_phone} class="form-control" name="owner_phone" required />
                                        <br />
                                    </form>
                                    <button type="button" onClick={() => this.props.onSubmit(this.createData())} class="btn btn-primary " ><strong>Update</strong></button>

                                </div>
                                <br />

                            </div>
                        </div>

                    </div>
                    <button type="button" onClick={() => this.props.onSubmit(this.createData())} class="btn btn-primary " ><strong>Update</strong></button>

                    <div path="/ownerProfile/restaurant" >
                        {sidebar}
                        <div id="myDIV7" style={{ "display": "none" }}>
                            <div class="container top-margin main " >
                                <div class="head block"></div>
                                <h5>Restaurant Details</h5>
                                <div class="bottom-border">
                                    <div>Restaurant Name<a onClick={this.myFunctionAddress} style={{ "float": "right" }}>Edit</a></div>
                                    <div id="myDIVAddress" >
                                        <form >
                                            <div class>
                                                <div class="form-group">
                                                <h3><p>Edit Details</p></h3>
                                                    <div>Restaurant Name</div>

                                                    <input type="text" onChange={this.props.onChange} class="form-control" name="restaurantName" placeholder={this.props.restaurantName} required />
                                                    <br />
                                                    <div>Zip Code</div>

                                                    <input type="text" onChange={this.props.onChange} class="form-control" name="zipCode" placeholder={this.props.zipCode} required />
                                                    <br />
                                                    <div>Cuisine</div>

                                                    <input type="text" onChange={this.props.onChange} class="form-control" name="cuisine" placeholder={this.props.cuisine} required />
                                                </div>
                                                <br />
                                            </div>
                                        </form>
                                        <button type="button" onClick={() => this.props.onSubmit(this.createData())} class="btn btn-primary " ><strong>Update</strong></button>
                                        <br />

                                    </div>
                                    <br />

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
        owner_firstName: store.posts.owner_firstName,
        owner_lastName: store.posts.owner_lastName,
        owner_email: store.posts.owner_email,
        owner_password: store.posts.owner_password,
        owner_address: store.posts.owner_address,
        owner_image: store.posts.owner_image,
        owner_phone: store.posts.owner_phone,
        restaurantId: store.posts.restaurantId,
        restaurantName: store.posts.restaurantName,
        zipCode: store.posts.zipCode,
        cuisine: store.posts.cuisine
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (e) => dispatch({ type: 'CHANGE', value: e }),
        onSubmit: (data) => {
            console.log("mapDispatchToProps data:  ", data)
            dispatch(ownerProfilePosts(data));
        },
        onCookie: () => {
            console.log("mapDispatchToProps data:  ")
            dispatch(ownerCookieData());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OwnerProfile)