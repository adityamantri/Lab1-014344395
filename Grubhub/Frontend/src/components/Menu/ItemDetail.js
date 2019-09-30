import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './BuyerProfile.css'
import { deleteSectionPosts, getSectionPosts, updateSectionPosts } from '../../actions/sectionActions';
import { getItemPosts, addItemPosts } from '../../actions/itemActions'
import { connect } from 'react-redux';
//Define a Login Component

let sectionHead = [], sectionBody = [], count = 0;

export class ItemDetail extends Component {


    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.props.onGetItem();
        console.log("component will mount section.js ");
    }


    onGetItem = () => {
        return {
            restaurantId: cookie.load('owner').restaurantId,
            itemName: this.props.location.state.itemName
        }
    }

    // createData = () => {
    //     var a = document.getElementById("sectionlist");
    //     a = (a.options[a.selectedIndex].value);
    //     return {
    //         sectionName: this.props.sectionName,
    //         itemDescription: this.props.itemDescription,
    //         restaurantId: cookie.load('owner').restaurantId,
    //         sectionId: a,
    //         itemList: this.props.itemList,
    //         itemName: this.props.itemName,
    //         itemImage: this.props.itemImage,
    //         restId: this.props.restId,
    //         itemId: this.props.itemId,
    //         itemPrice: this.props.itemPrice
    //     }
    // }

    // updateData = () => {
    //     console.log("inside updateData()");
    //     var a = document.getElementById("sectionlist");
    //     a = (a.options[a.selectedIndex].value);
    //     return {
    //         itemName: this.props.itemName,
    //         sectionDescription: this.props.sectionDescription,
    //         restaurantId: cookie.load('owner').restaurantId,
    //         sectionId: a
    //     }
    // }
    render() {
        console.log("section List n render: ", this.props.sectionList)

        let list = this.props.sectionList.map(section => {
            return (
                <option value={section.sectionId}>{section.sectionName}</option>
            )
        });

        let addItem = (
            <div>
                <div class="container top-margin main " >
                    <p><h3>View Item</h3></p>
                    <br />
                    <form onSubmit={(e) => this.props.onSubmit(e, this.createData())}>
                        <div class="form-group">
                            <input type="file" ></input>
                            <h4>Section</h4>
                            <select name="sectionlist" id="sectionlist" >
                                {list}
                            </select>
                            <h4>Item Name</h4>
                            <td type="text" onChange={this.props.onChange} class="form-control" placeholder={this.props.location.state.itemName} name="itemName" required />
                            <h4>Item Description</h4>
                            <textarea type="text" onChange={this.props.onChange} class="form-control" name="itemDescription" required />
                            <h4>Item Price</h4>
                            <input type="text" onChange={this.props.onChange} class="form-control" name="itemPrice" required />
                        </div>
                        <br />
                        <button type="submit" class="btn btn-primary " ><strong>Add</strong></button>
                        <button type="button" onClick={() => this.myFunction7("addItem")} class="btn btn-default " value="cancel" ><strong>Cancel</strong></button>
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
                            <select name="sectionlist" id="sectionlist" >
                                {list}
                            </select>
                            <h4>Item Name</h4>
                            <input type="text" onChange={this.props.onChange} class="form-control" placeholder={this.props.location.state.itemName} name="itemName" required />
                            <h4>Item Description</h4>
                            <textarea type="text" onChange={this.props.onChange} class="form-control" name="itemDescription" required />
                            <h4>Item Price</h4>
                            <input type="text" onChange={this.props.onChange} class="form-control" name="itemPrice" required />
                        </div>
                        <br />
                        <button type="submit" class="btn btn-primary " ><strong>Add</strong></button>
                        <button type="button" onClick={() => this.myFunction7("addItem")} class="btn btn-default " value="cancel" ><strong>Cancel</strong></button>
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
            console.log("mapDispatchToProps data:  ", data)
            dispatch(addItemPosts(data));
        },
        onCookie: () => {
            console.log("mapDispatchToProps data:  ");
            dispatch(getItemPosts(cookie.load('owner').restaurantId))
        },
        onGetItem: (e,data)=>{
            console.log("Item Details");
           // dispatch(getItemDetails(data));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail)