import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import BSignUp from './SignUp/BuyerSignUp';
import BuyerUpdate from './Profile/BuyerProfile';
import OwnerSignUp from './SignUp/OwnerSignUp';
import OwnerLogin from './Login/OwnerLogin';

// import Home from './Home/Home';
// import Delete from './Delete/Delete';
// import Create from './Create/Create';
import Navbar from './LandingPage/Navbar';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/login" component={Login}/>
                <Route path="/buyerSignUp" component={BSignUp}/>
                <Route path="/buyerProfile" component={BuyerUpdate}/>
                <Route path="/ownerLogin" component={OwnerLogin}/>
                <Route path="/ownerSignUp" component={OwnerSignUp}/>
                {/* <Route path="/home" component={Home}/>
                <Route path="/delete" component={Delete}/>
                <Route path="/create" component={Create}/> */}
            </div>
        )
    }
}
//Export The Main Component
export default Main;