import { BUYER_SIGNUP_POST, BUYER_LOGIN_POST } from './types';
import axios from 'axios';

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
            password: data.lastName,
            phone: data.phone
        }
    }
}



    //     if (response.status === 200) {
    //         this.setState({
    //             authFlag: true,
    //             error: ""
    //         })
    //     }
    // }).catch(error => {
    //     this.setState({
    //         authFlag: false,
    //         error: "Invalid Credentials"
    //     })
    // });


