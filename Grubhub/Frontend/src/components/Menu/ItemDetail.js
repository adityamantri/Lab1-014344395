import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './BuyerProfile.css';
import {getItemDetails, updateItemPosts, getItemPosts, addItemPosts } from '../../actions/itemActions'
import { connect } from 'react-redux';
//Define a Login Component

let sectionHead = [], sectionBody = [], count = 0;

export class ItemDetail extends Component {


    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        let data={
            restaurantId: cookie.load('owner').restaurantId,
            itemName: this.props.location.state.itemName
        };
        this.props.onGetItem(data);
        console.log("component will mount section.js ");
    }


    onGetItem = () => {
        return {
            restaurantId: cookie.load('owner').restaurantId,
            itemName: this.props.location.state.itemName
        }
    }

    updateData = () => {
        
        return {
            sectionName: this.props.sectionName,
            itemDescription: this.props.itemDescription,
            restaurantId: cookie.load('owner').restaurantId,
            sectionId: this.props.sectionId,
            itemName: this.props.itemName,
            itemImage: this.props.itemImage,
            restId: this.props.restId,
            itemId: this.props.itemId,
            itemPrice: this.props.itemPrice
        }
    }

    render() {
        console.log("section List n render: ", this.props.sectionList)

        // let list = this.props.sectionList.map(section => {
        //     return (
        //         <option value={section.sectionId}>{section.sectionName}</option>
        //     )
        // });

        let addItem = (
            <div>
                <div class="container top-margin main " >
                    <p><h3>View Item</h3></p>
                    <br />
                    <form onSubmit={(e) => this.props.onSubmit(e, this.createData())}>
                        <div class="form-group">
                            <input type="file" ></input>
                            <h4>Section</h4>
                            <div>{this.props.sectionName}</div>
                            <h4>Item Name</h4>
                            <div >{this.props.location.state.itemName}</div>
                            <h4>Item Description</h4>
                            <div >{this.props.itemDescription} </div>
                            <h4>Item Price</h4>
                            <div>{this.props.itemPrice}</div>
                        </div>
                        <br />
                        <button type="button" onClick={() => this.myFunction7("addItem")} class="btn btn-default " value="cancel" ><strong>Return</strong></button>
                    </form>
                    <br />
                </div>

                <div class="container top-margin main " >
                    <p><h3>Update Item</h3></p>
                    <br />
                    <form onSubmit={(e) => this.props.onSubmit(e, this.createData())}>
                        <div class="form-group">
                            <input type="file" ></input>
                            <h4>Section</h4>
                            <div>{this.props.sectionName}</div>
                            <h4>Item Name</h4>
                            <input type="text" onChange={this.props.onChange} class="form-control" placeholder={this.props.location.state.itemName} name="itemName" required />
                            <h4>Item Description</h4>
                            <textarea type="text" onChange={this.props.onChange} class="form-control" placeholder={this.props.itemDescription} name="itemDescription" required />
                            <h4>Item Price</h4>
                            <input type="text" onChange={this.props.onChange} class="form-control" placeholder={this.props.itemPrice} name="itemPrice" required />
                        </div>
                        <br />
                        <button type="submit" class="btn btn-primary " ><strong>Update</strong></button>
                        <button type="button" onClick={(e) => this.props.onUpdate(e, this.updateData())} class="btn btn-default " value="cancel" ><strong>Cancel</strong></button>
                    </form>
                    <br />
                </div>
            </div>
        );


        return (
            <div>
                {/* {sidebar} */}
                <div id="addItem" style={{ "display": "block" }}> {addItem} </div >
                <br /><br />
                <h1>{this.props.location.state.itemName}</h1>
                <h1>{this.props.location.state.restId}</h1>
            </div >
        )
    }
}
const mapStateToProps = (store) => {
    console.log('storte vaslur', store);
    return {
        sectionList: store.posts.sectionList,
        sectionName: store.posts.sectionName,
        sectionId: store.posts.sectionId,
        itemName: store.posts.itemName,
        //itemImage: store.props.itemImage,
        itemDescription: store.posts.itemDescription,
        restaurantId: store.posts.restaurantId,
        itemId: store.posts.itemId,
        itemPrice: store.posts.itemPrice,
        itemList: store.posts.itemList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (e) => dispatch({ type: 'CHANGE', value: e }),
        onSubmit: (e, data) => {
            e.preventDefault();
            console.log("mapDispatchToProps data:  ", data);
            dispatch(addItemPosts(data));
        },
        onUpdate: (e,data) =>{
            e.preventDefault();
            console.log("onUpdate mapdispatchtoprops data:  ",data);
            dispatch(updateItemPosts(data));

        },
        onGetItem: (data)=>{
            console.log("Item Details");
            dispatch(getItemDetails(data));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail)