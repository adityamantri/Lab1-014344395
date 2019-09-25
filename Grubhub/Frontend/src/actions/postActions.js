import { BUYER_SIGNUP_POST, BUYER_LOGIN_POST, OWNER_SIGNUP_POST } from './types';
import axios from 'axios';
import cookie from 'react-cookies';

export const buyerSignUpPosts = (postData) => dispatch => {
    console.log("reached axios", postData)
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/buyer/signUpBuyer', postData)
        .then(response => {
            console.log("buyerSignUpPostsSuccess", response + response.data);

            dispatch(buyerSignUpPostsSuccess(response.data));

        }).catch(error => {
            throw (error);
        });
}
export const buyerSignUpPostsSuccess = (data) => {
    return {
        type: BUYER_SIGNUP_POST,
        payload: {
            error: data
        }
    }
}

export const buyerLoginPosts = (postData) => dispatch => {
    console.log("reached axios", postData)
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/buyer/signInBuyer', postData)
        .then(response => {
            console.log("buyerSignInPostsSuccess--------", response.data);

            dispatch(buyerLoginPostsSuccess(response.data));

        }).catch(error => {
            throw (error);
        });
}
export const buyerLoginPostsSuccess = (data) => {
    return {
        type: BUYER_LOGIN_POST,
        payload: {
            address: data.address,
            buyerId: data.buyerId,
            email: data.email,
            firstName: data.firstName,
            image: data.image,
            lastName: data.lastName,
            password: data.password,
            phone: data.phone
        }
    }
}


export const buyerProfilePosts = (postData) => dispatch => {
    console.log("reached axios", postData)
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/buyer/updateBuyer', postData)
        .then(response => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
                console.log("buyer profile response--------- ", response)
                dispatch(buyerLoginPostsSuccess(response.data));
            }
        }).catch(error => {
            throw (error);
        });
}

export const buyerCookieData = () => dispatch => {
    console.log("Inside buyer cookie data --------")
    console.log("cookie buyer:     ", cookie.load('buyer'));

    let buyer = cookie.load('buyer');
    console.log("cookie variable buyer", buyer);

    axios.get(`http://localhost:3001/buyer/getBuyer/${buyer.buyerId}`)
        .then(response => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
                console.log("buyer profile response--------- ", response)
                dispatch(buyerLoginPostsSuccess(response.data));
            }
        }).catch(error => {
            throw (error);
        });
}

export const ownerSignUpPosts = (postData) => dispatch => {
    console.log("reached axios", postData)
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/owner/signUpOwner', postData)
        .then(response => {
            console.log("buyerSignInPostsSuccess--------", response.data);

            dispatch(ownerSignUpPostsSuccess(response.data));

        }).catch(error => {
            throw (error);
        });
}

export const ownerSignInPosts = (postData) => dispatch => {
    console.log("reached axios", postData)
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/owner/signInOwner', postData)
        .then(response => {
            console.log("buyerSignInPostsSuccess--------", response.data);

            dispatch(ownerSignUpPostsSuccess(response.data));

        }).catch(error => {
            throw (error);
        });
}


export const ownerSignUpPostsSuccess = (data) => {
    return {
        type: OWNER_SIGNUP_POST,
        payload: {
            owner_address: data.owner_address,
            restaurantId: data.buyerId,
            owner_email: data.owner_email,
            owner_firstName: data.owner_firstName,
            owner_image: data.owner_image,
            owner_lastName: data.owner_lastName,
            owner_password: data.owner_password,
            owner_phone: data.owner_phone,
            zipCode: data.zipCode,
            cuisine: data.cousine,
            restaurantImage: data.restaurantImage,
            restaurantName: data.restaurantName
        }
    }
}

