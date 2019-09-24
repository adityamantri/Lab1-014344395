import { BUYER_SIGNUP_POST, BUYER_LOGIN_POST } from '../actions/types';

// Reducer holds the functionality to modify any action done on component page

const initialState = {
    items: [], //array of posts output coming from our action (fetch request )
    item: {},
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error:"",
    buyerProfile:{},
    nextpage: false

    //single post object that we send to backend---------imp
}

// the below function checks what action we are dealing with. 
export default function (state = initialState, action) {
    console.log('Action Value in Reducer ', action)
    switch (action.type) {

        case 'CHANGE':
            const { name, value } = action.value.target;
            let som = Object.assign({}, state, { [name]: value })
            console.log(som)
            return som;

        case BUYER_SIGNUP_POST:
            console.log("inside postReducer BUYER_SIGNUP_POST CASE: Action ---",action)
            return{
                error:action.payload.error
            }

        case BUYER_LOGIN_POST:
            console.log("inside postReducer BUYER_LOGIN_POST switch case",action)
            return{
                buyerProile:action.payload,
                nextpage:true
            }

        default:
            return state;
    }
}