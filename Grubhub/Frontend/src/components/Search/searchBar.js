import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './Login.css';
import { connect } from 'react-redux';
import { searchItemRestaurantPosts } from '../../actions/searchActions';
//Define a Login Component

let flag=false, redirectToRest=null;
class Login extends Component {


    searchData = () => {
        return {
            itemName: this.props.itemName,
            error: this.props.error
        }
    }

    selectData = (restaurantid,restaurantName) => {
        console.log("inside SelectData()");
        flag=true;
        redirectToRest= (
            <Redirect to={{
                pathname: '/restaurant',
                state: { restId: restaurantid, restName:restaurantName}        
            }}/>

        )
        this.setState({});
    }

    render() {
        console.log("FGUJVHBKNLJHCFVJBKN", this.props.restaurantList)
        if(flag){
            flag=false;
        }else{
            redirectToRest=null;
        }
        let details = null;
        if (this.props.restaurantList.length > 0 && typeof (this.props.restaurantList) !== 'undefined' && this.props.restaurantList !== null) {

            details = this.props.restaurantList.map(item => {
                return (
                    
                    <tr>
                         <td><h4>{item.restaurantName}</h4></td>
                        <td>{item.cuisine}</td>
                        <td><button value={item.restaurantId} class="btn btn-primary"
                        onClick={(e) => this.selectData(item.restaurantId,item.restaurantName)}>Select</button></td>
                    </tr>
                )
            });
        }

        let display = (
            <div class="container">
            <div style={{textAlign:"center"}}><h1>Restaurant List</h1></div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Restaurant Name</th>
                        <th>Cuisine</th>
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
                
                <div class="container">

                    <div class="login-form">
                        <div class="main-div">
                            <form onSubmit={(e) => this.props.onSubmit(e, this.searchData())}>

                                <div class="panel">
                                    <h4>{this.props.error}</h4>
                                    <h2>Welcome to Grubhub</h2>
                                </div>

                                <div class="form-group">
                                    <h4>Search</h4>
                                    <input type="text" placeholder="search for food" onChange={this.props.onChange} class="form-control " name="itemName" required />
                                </div>
                                <button type="submit" class="btn btn-danger btn-lg btn-block" ><strong>Find</strong></button>
                                <br />
                                {redirectToRest}
                            </form>
                        </div>
                    </div>

                </div>

                
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