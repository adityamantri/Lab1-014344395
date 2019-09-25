import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { ownerSignInPosts } from '../../actions/postActions';

//Define a Login Component
class Login extends Component {
    
    createData = () => {
        return {
            owner_address: this.props.owner_address,
            restaurantId: this.props.buyerId,
            owner_email: this.props.owner_email,
            owner_firstName: this.props.owner_firstName,
            owner_image: this.props.owner_image,
            owner_lastName: this.props.owner_lastName,
            owner_password: this.props.owner_password,
            owner_phone: this.props.owner_phone,
            zipCode: this.props.zipCode,
            cuisine: this.props.cousine,
            restaurantImage: this.props.restaurantImage,
            restaurantName: this.props.restaurantName,
            error: this.props.error
        }
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/ownerProfile" />
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
                                <input onChange={this.props.onChange} type="text" class="form-control" name="owner_email" placeholder="" required/>
                            </div>
                            <div class="form-group">
                                <div>Password</div>
                                <input onChange={this.props.onChange} type="owner_password" class="form-control" name="owner_password" placeholder="" required/>
                            </div>
                            <div style={{"textAlign":"center"}}>
                            <button onClick={() => this.props.onSubmit(this.createData())}  class="btn btn-primary btn-lg btn-block">Sign in</button>
                            <h3>{this.props.error}</h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}
const mapStateToProps = (store) => {
    console.log('storte vaslur', store);
    return {

        owner_address: store.posts.owner_address,
        restaurantId: store.posts.buyerId,
        owner_email: store.posts.owner_email,
        owner_firstName: store.posts.owner_firstName,
        owner_image: store.posts.owner_image,
        owner_lastName: store.posts.owner_lastName,
        owner_password: store.posts.owner_password,
        owner_phone: store.posts.owner_phone,
        zipCode: store.posts.zipCode,
        cuisine: store.posts.cousine,
        restaurantImage: store.posts.restaurantImage,
        restaurantName: store.posts.restaurantName,
        error: store.posts.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (e) => dispatch({ type: 'CHANGE', value: e }),
        onSubmit: (data) => {
            console.log(data)
            dispatch(ownerSignInPosts(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);