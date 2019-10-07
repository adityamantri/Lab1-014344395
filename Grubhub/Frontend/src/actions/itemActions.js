import { SECTION_POST, ITEM_POST } from './types';
import axios from 'axios';
import cookie from 'react-cookies';


export const addItemPosts = (postData) => dispatch => {
    console.log("reached axios", postData)
    axios.defaults.withCredentials = true;
    axios.post('http://3.15.185.248:3001/item/addItem', postData)
        .then(response => {
            console.log("itemPostsSuccess", response);

            //dispatch(itemPostsSuccess(response.data));

        }).catch(error => {
            console.log("error thrown from backend ")
            throw (error);
        });
}
export const itemPostsSuccess = (data) => {
    console.log("item posts succcess: data ",data)
    return {
        type: ITEM_POST,
        payload: {
            itemList: data.result,
            sectionList: data.results,
            sectionId: data.sectionId,
            sectionDescription: data.sectionDescription,
            restaurantId: data.restId,
            itemImage: data.itemImage,
            itemId: data.itemId,
            itemDescription: data.itemDescription,
            itemPrice: data.itemPrice,
            itemName: data.itemName,
            sectionName: data.sectionName
        }
    }
}
export const deleteItemPosts = (postData) => dispatch => {
    console.log("reached axios", postData)
    axios.defaults.withCredentials = true;
    axios.post(`http://3.15.185.248:3001/item/deleteItem`,postData)
        .then(response => {
            console.log("itemPostsSuccess", response);

            //dispatch(itemPostsSuccess(response));

        }).catch(error => {
            console.log("error thrown from backend ")
            throw (error);
        });
}

export const getItemPosts = (postData) => dispatch => {
    console.log("reached axios", postData)
    axios.defaults.withCredentials = true;
    axios.get(`http://3.15.185.248:3001/item/getItem/${postData}`)
        .then(response => {
            console.log("itemPostsSuccess", response);

            dispatch(itemPostsSuccess(response.data));

        }).catch(error => {
            console.log("error thrown from backend ",error)
            throw (error);
        });
}

export const updateItemPosts = (postData) => dispatch => {
    console.log("reached axios", postData)
    axios.defaults.withCredentials = true;
    axios.post(`http://3.15.185.248:3001/item/updateItem`,postData)
        .then(response => {
            console.log("itemPostsSuccess", response);
            dispatch(itemPostsSuccess(response.data));
        }).catch(error => {
            console.log("error thrown from backend ")
            throw (error);
        });
}

export const getItemDetails = (postData) => dispatch => {
    console.log("reached axios", postData)
    axios.defaults.withCredentials = true;
    axios.post(`http://3.15.185.248:3001/item/getItemDetails`,postData)
        .then(response => {
            console.log("itemPostsSuccess", response);
            dispatch(itemdataPostsSuccess(response.data));
        }).catch(error => {
            console.log("error thrown from backend ")
            throw (error);
        });
}
export const itemdataPostsSuccess = (data) => {
    console.log("item data Posts succcess: data ",data)
    return {
        type: ITEM_POST,
        payload: {
            itemList: data[0].result,
            sectionList: data[0].results,
            sectionId: data[0].sectionId,
            sectionDescription: data[0].sectionDescription,
            restaurantId: data[0].restId,
            itemImage: data[0].itemImage,
            itemId: data[0].itemId,
            itemDescription: data[0].itemDescription,
            itemPrice: data[0].itemPrice,
            itemName: data[0].itemName,
            sectionName: data[0].sectionName
        }
    }
}