import { BUYER_SIGNUP_POST, BUYER_LOGIN_POST, LOAD_BUYER_COOKIE, OWNER_SIGNUP_POST } from '../actions/types';

// Reducer holds the functionality to modify any action done on component page

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    image: "",
    phone: "",
    
    error: "",

    owner_address: "",
    restaurantId: "",
    owner_email: "",
    owner_firstName: "",
    owner_image: "",
    owner_lastName: "",
    owner_password: "",
    owner_phone: "",
    zipCode: "",
    cuisine: "",
    restaurantImage: null,
    restaurantName: ""

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
            console.log("inside postReducer BUYER_SIGNUP_POST CASE: Action ---", action)
            return {
                error: action.payload.error
            }

        case BUYER_LOGIN_POST:
            console.log("inside postReducer BUYER_LOGIN_POST switch case", action)
            return {
                address: action.payload.address,
                buyerId: action.payload.buyerId,
                email: action.payload.email,
                firstName: action.payload.firstName,
                image: action.payload.image,
                lastName: action.payload.lastName,
                password: action.payload.password,
                phone: action.payload.phone,
                error: action.payload.error
            }

        case LOAD_BUYER_COOKIE:
            console.log("loading buyer cookie to state: ", action)
            return {

            }

        case OWNER_SIGNUP_POST:
            console.log("");
            return {
                owner_address: action.payload.owner_address,
                restaurantId: action.payload.restaurantId,
                owner_email: action.payload.owner_email,
                owner_firstName: action.payload.owner_firstName,
                owner_image: action.payload.owner_image,
                owner_lastName: action.payload.owner_lastName,
                owner_password: action.payload.owner_password,
                owner_phone: action.payload.owner_phone,
                zipCode: action.payload.zipCode,
                cuisine: action.payload.cuisine,
                restaurantImage: action.payload.restaurantImage,
                restaurantName: action.payload.restaurantName
            }


        default:
            return state;
    }
}