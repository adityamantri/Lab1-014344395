import { SEARCH_POST } from './types';
import axios from 'axios';
import cookie from 'react-cookies';


export const searchItemRestaurantPosts = (postData) => dispatch => {
    console.log("reached axios", postData)
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/search/searchRestaurant', postData)
        .then(response => {
            console.log("sectionPostsSuccess", response);

            dispatch(searchPostsSuccess(response.data));

        }).catch(error => {
            console.log("error thrown from backend ")
            throw (error);
        });
}
export const searchPostsSuccess = (data) => {
    return {
        type: SEARCH_POST,
        payload: {
            restaurantList: data
            // sectionName: data.sectionName,
            // sectionId: data.sectionId,
            // sectionDescription: data.sectionDescription,
            // restaurantId: data.restId
        }
    }
}

