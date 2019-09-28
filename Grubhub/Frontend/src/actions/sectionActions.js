import { SECTION_POST } from './types';
import axios from 'axios';
import cookie from 'react-cookies';


export const addSectionPosts = (postData) => dispatch => {
    console.log("reached axios", postData)
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/section/addSection', postData)
        .then(response => {
            console.log("sectionPostsSuccess", response);

            dispatch(sectionPostsSuccess(response.data));

        }).catch(error => {
            console.log("error thrown from backend ")
            throw (error);
        });
}
export const sectionPostsSuccess = (data) => {
    return {
        type: SECTION_POST,
        payload: {
            sectionList: data
            // sectionName: data.sectionName,
            // sectionId: data.sectionId,
            // sectionDescription: data.sectionDescription,
            // restaurantId: data.restId
        }
    }
}
export const deleteSectionPosts = (postData) => dispatch => {
    console.log("reached axios", postData)
    axios.defaults.withCredentials = true;
    axios.delete(`http://localhost:3001/section/deleteSection/${postData}`)
        .then(response => {
            console.log("sectionPostsSuccess", response);

            dispatch(sectionPostsSuccess(response));

        }).catch(error => {
            console.log("error thrown from backend ")
            throw (error);
        });
}

export const getSectionPosts = (postData) => dispatch => {
    console.log("reached axios", postData)
    axios.defaults.withCredentials = true;
    axios.get(`http://localhost:3001/section/getSection/${postData}`)
        .then(response => {
            console.log("sectionPostsSuccess", response);

            dispatch(sectionPostsSuccess(response.data));

        }).catch(error => {
            console.log("error thrown from backend ")
            throw (error);
        });
}

export const updateSectionPosts = (postData) => dispatch => {
    console.log("reached axios", postData)
    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:3001/section/updateSection`,postData)
        .then(response => {
            console.log("sectionPostsSuccess", response);
            dispatch(sectionPostsSuccess(response.data));
        }).catch(error => {
            console.log("error thrown from backend ")
            throw (error);
        });
}
