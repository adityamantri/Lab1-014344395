import { SECTION_POST, ITEM_POST } from './types';
import axios from 'axios';
import cookie from 'react-cookies';


export const insertOrderPosts = (postData) => dispatch => {
    console.log("reached axios", postData)
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/item/addItem', postData)
        .then(response => {
            console.log("insertOrderSuccess", response);

            dispatch(insertOrderSuccess(response.data));

        }).catch(error => {
            console.log("error thrown from backend ")
            throw (error);
        });
}
export const insertOrderSuccess = (data) => {
    console.log("item posts succcess: data ",data)
    return {
        type: ITEM_POST,
        payload: {
            itemList: data.result,
            sectionList: data.results,
            sectionId: data.sectionId,
            sectionDescription: data.sectionDescription,
            restaurantId: data.restId,
            itemId: data.itemId,
            itemDescription: data.itemDescription,
            itemPrice: data.itemPrice,
            itemName: data.itemName,
            sectionName: data.sectionName
        }
    }
}