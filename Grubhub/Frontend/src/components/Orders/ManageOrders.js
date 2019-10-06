import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './Login.css';
import { connect } from 'react-redux';
import { searchItemRestaurantPosts } from '../../actions/searchActions';
import axios from 'axios';
//Define a Login Component

let flag = false, redirectToRest = null;
class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            restId: cookie.load('owner').restaurantId,
            upcomingList: []

        }
    }

    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        let restId = { restId: cookie.load('owner').restaurantId }
        console.log("restId is : ", restId)
        // this.props.onCookie(restId);
        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:3001/ownerOrder/currentOrder`, restId)
            .then(response => {
                console.log("itemPostsSuccess", response);

                this.setState({
                    upcomingList: response.data
                })

            }).catch(error => {
                console.log("error thrown from backend ", error)
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



    handleChange = (e, series) => {
        let status = e.target.value;
        let data = {
            orderStatus: status,
            series: series
        }
        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:3001/ownerOrder/updateOrderStatus`, data)
            .then(response => {
                console.log("itemPostsSuccess", response);

                window.location.reload();

            }).catch(error => {
                console.log("error thrown from backend ", error)
                throw (error);
            });

    }

    render() {

        //console.log("FGUJVHBKNLJHCFVJBKN", this.props.restaurantList)
        if (flag) {
            flag = false;
        } else {
            redirectToRest = null;
        }
        let details = null;
        if (this.state.upcomingList.length > 0 && typeof (this.state.upcomingList) !== 'undefined' && this.state.upcomingList !== null) {

            details = this.state.upcomingList.map(orders => {
                return (

                    <tr>
                        <td><h4>{orders.firstName}</h4></td>
                        <td>{orders.address}</td>
                        <td>{orders.itemName}</td>
                        <td>{orders.orderItemQty}</td>
                        <td>{orders.itemPrice}</td>
                        <td>{orders.orderStatus}</td>
                        <td><select 
                            onChange={(e) => this.handleChange(e, orders.series)} name="selectValue" id="selectValue">
                            <option value="NEW">NEW</option>
                            <option value="PREPARING">PREPARING</option>
                            <option value="READY">READY</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="CANCEL">CANCEL</option>
                        </select></td>

                        {/* {orders.orderStatus} */}
                    </tr>
                )
            });
        }



        let display = (
            <div class="container">
                <div style={{ textAlign: "center" }}><h1>Manage Orders</h1></div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Address</th>
                            <th>Item Name</th>
                            <th>Ouantity</th>
                            <th>Price</th>
                            <th>Current Status</th>
                            <th>Update Status</th>
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