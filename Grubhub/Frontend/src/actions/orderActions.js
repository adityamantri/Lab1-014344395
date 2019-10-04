import { ADD_ORDER_POST} from './types';
import axios from 'axios';
import cookie from 'react-cookies';


export const insertOrderPosts = (postData) => dispatch => {
    console.log("reached axios", postData)
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/order/add', postData)
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
        type: ADD_ORDER_POST,
        payload: {
            addOrderOutput:data.output
        }
    }
}