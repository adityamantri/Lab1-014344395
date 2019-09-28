import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './BuyerProfile.css'
import { addSectionPosts, deleteSectionPosts, getSectionPosts, updateSectionPosts } from '../../actions/sectionActions';
import { connect } from 'react-redux';
//Define a Login Component
class AddItem extends Component {

    myFunction7 = (y) => {
        var x = document.getElementById(y);
        console.log("reached function ", y)
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.props.onCookie();
        console.log("component will mount section.js ");
    }

    createData = () => {
        return {
            sectionName: this.props.sectionName,
            sectionDescription: this.props.sectionDescription,
            restaurantId: cookie.load('owner').restaurantId,
            sectionId: this.props.sectionId
        }
    }

    updateData = () => {
        console.log("inside updateData()");
        var a = document.getElementById("sectionlist");
        a = (a.options[a.selectedIndex].value);
        return {
            itemName: this.props.itemName,
            sectionDescription: this.props.sectionDescription,
            restaurantId: cookie.load('owner').restaurantId,
            sectionId: a
        }
    }
    render() {
        console.log("section List n render: ", this.props.sectionList)
        let sidebar = (
            <div class="sidenav">
                <h2 class="title nav-header">Manage Section</h2>
                <ul>
                    <li ><a onClick={() => this.myFunction7("deleteSection")}>View/Delete</a></li>
                    <li ><a onClick={() => this.myFunction7("addSection")}>Add Section</a></li>
                    <li ><a onClick={() => this.myFunction7("updateSection")}>Update</a></li>
                </ul>
            </div>
        );

        return (
            <div>
                {sidebar}
                <div id="addSection" style={{ "display": "none" }}>  </div >
                <div id="deleteSection" style={{ "display": "none" }}>  </div >
                <div id="updateSection" style={{ "display": "none" }}>  </div >
            </div >

        )
    }
}
const mapStateToProps = (store) => {
    console.log('storte vaslur', store);
    return {
        sectionList: store.posts.sectionList,
        sectionName: store.posts.sectionName,
        sectionDescription: store.posts.sectionDescription,
        restId: store.posts.restId,
        sectionId: store.posts.sectionId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (e) => dispatch({ type: 'CHANGE', value: e }),
        onSubmit: (e, data) => {
            e.preventDefault();
            console.log("mapDispatchToProps data:  ", data)
            dispatch(addSectionPosts(data));
        },
        onCookie: () => {
            console.log("mapDispatchToProps data:  ")
            dispatch(getSectionPosts(cookie.load('owner').restaurantId));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddItem)