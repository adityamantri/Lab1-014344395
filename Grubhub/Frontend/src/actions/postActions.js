import { FETCH_POSTS, NEW_POST, BUYER_SIGNUP_POST } from './types';
import axios from 'axios';


export const buyerSignUpPosts = (postData) => dispatch => {

axios.defaults.withCredentials = true;
axios.post('http://localhost:3001/buyer/signUpBuyer', postData)
    .then(response => {
        dispatch(buyerSignUpPostsSuccess(response.data))
    }).catch(error =>{
        throw(error);
    });
}

export const buyerSignUpPostsSuccess = (data) =>{
    return {
        type: BUYER_SIGNUP_POST,
        payload:{
            error:data.error
        }
    }
}





    //     console.log("Status Code : ", response.status);
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


