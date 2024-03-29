import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './Login.css';
import { connect } from 'react-redux';
import { searchItemRestaurantPosts } from '../../actions/searchActions';
import axios from 'axios';
//Define a Login Component
let restId=null;
let flag = false, redirectToRest = null;
class Login extends Component {


    constructor(props){
       
        super(props);
        if(cookie.load('buyer')){
        this.state={
            restId : cookie.load('buyer').buyerId,
            pastList: []
            
        }}
    }

    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        if(cookie.load('buyer')){
        restId = {buyerId:cookie.load('buyer').buyerId}
        }
        console.log("restId is : ",restId)
       // this.props.onCookie(restId);
       axios.defaults.withCredentials = true;
       axios.post(`http://3.15.185.248:3001/order/pastOrder`,restId)
           .then(response => {
               console.log("itemPostsSuccess", response);
   
               this.setState({
                pastList:response.data
               })
   
           }).catch(error => {
               console.log("error thrown from backend ",error)
               throw (error);
           });
    }

    searchData = () => {
        return {
            itemName: this.props.itemName,
            error: this.props.error
        }
    }

    selectData = (restaurantid, restaurantName) => {
        console.log("inside SelectData()");
        flag = true;
        redirectToRest = (
            <Redirect to={{
                pathname: '/restaurant',
                state: { restId: restaurantid, restName: restaurantName }
            }} />

        )
        this.setState({});
    }

    render() {
        //console.log("FGUJVHBKNLJHCFVJBKN", this.props.restaurantList)
        if (flag) {
            flag = false;
        } else {
            redirectToRest = null;
        }
        let details = null;
        if(cookie.load('buyer')){
        if (this.state.pastList.length > 0 && typeof (this.state.pastList) !== 'undefined' && this.state.pastList !== null) {

            details = this.state.pastList.map(orders => {
                return (

                    <tr>
                        <td><h4>{orders.restName}</h4></td>
                        <td>{orders.itemName}</td>
                        <td>{orders.orderItemQty}</td>
                        <td>{orders.itemPrice}</td>
                        <td>{orders.orderStatus}</td>
                    </tr>
                )
            });
        }
    }

        let display = (
            <div class="container">
                <div style={{ textAlign: "center" }}><h1>Past Orders</h1></div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Restaurant Name</th>
                            <th>Item Name</th>
                            <th>Ouantity</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details}
                    </tbody>
                </table>
            </div>);


        //redirect based on successful login
        let redirectVar = null;
        console.log("  inside render------", this.createData)
        if (cookie.load('buyer')) {
            //redirectVar = <Redirect to="/buyerProfile" />
        }
        return (
            <div>
                {/* <ul>  {restaurantlist}</ul> */}
                {display}
            </div >
        )
    }
}
const mapStateToProps = (store) => {
    console.log('store value', store);
    return {
        itemName: store.posts.itemName,
        restaurantList: store.posts.restaurantList,
        error: store.posts.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (e) => dispatch({ type: 'CHANGE', value: e }),
        onSubmit: (e, data) => {
            e.preventDefault();
            console.log("mapDispatchToProps data:  ", data)
            dispatch(searchItemRestaurantPosts(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)