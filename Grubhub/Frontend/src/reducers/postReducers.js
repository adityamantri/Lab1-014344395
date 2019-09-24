import {FETCH_POSTS,NEW_POST, BUYER_SIGNUP_POST} from '../actions/types';

// Reducer holds the functionality to modify any action done on component page

const initialState = {
    items:[], //array of posts output coming from our action (fetch request )
    item:{},
    firstName:"",
    lastName:"",
    email:"",
    password:""

       //single post object that we send to backend---------imp
}

// the below function checks what action we are dealing with. 
export default function( state= initialState, action){
    console.log('Action Value',action.value.target)
    switch(action.type){

        case 'CHANGE':
            const {name,value} = action.value.target;
            return Object.assign({},state,{[name]:value})
            

       
        default:
            return state;
    }
}