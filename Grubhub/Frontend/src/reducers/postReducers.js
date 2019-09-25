import { BUYER_SIGNUP_POST, BUYER_LOGIN_POST,LOAD_BUYER_COOKIE } from '../actions/types';

// Reducer holds the functionality to modify any action done on component page

const initialState = {
    items: [], //array of posts output coming from our action (fetch request )
    item: {},
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address:"",
    image:"",
    phone:"",
    error:"",
    buyerProfile:{}

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
                address: action.payload.address,
            buyerId: action.payload.buyerId,
            email: action.payload.email,
            firstName: action.payload.firstName,
            image: action.payload.image,
            lastName: action.payload.lastName,
            password: action.payload.password,
            phone: action.payload.phone,
            buyerId: action.payload.buyerId
            }

        case LOAD_BUYER_COOKIE:
            console.log("loading buyer cookie to state: ",action)
            return{

            }

        default:
            return state;
    }
}