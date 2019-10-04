import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
import BSignUp from './SignUp/BuyerSignUp';
import BuyerUpdate from './Profile/BuyerProfile';
import OwnerSignUp from './SignUp/OwnerSignUp';
import OwnerLogin from './Login/OwnerLogin';
import OwnerUpdate from './Profile/OwnerProfile';
import Section from './Section/Section';
import AddItem from './Menu/AddItem';
import ItemDetail from './Menu/ItemDetail';
import SearchBar from './Search/searchBar';
import Restaurant from './Restaurant/Restaurant';
import PastOrder from './Orders/PastOrders';
import UpcomingOrders from './Orders/UpcomingOrders';
import OwnerPastOrders from './Orders/OwnerPastOrders';
import ManageOrders from './Orders/ManageOrders';

// import Home from './Home/Home';
// import Delete from './Delete/Delete';
// import Create from './Create/Create';
import Navbar from './LandingPage/Navbar';
//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar} />
                <Route path="/login" component={Login} />
                <Route path="/buyerSignUp" component={BSignUp} />
                <Route path="/buyerProfile" component={BuyerUpdate} />
                <Route path="/ownerLogin" component={OwnerLogin} />
                <Route path="/ownerSignUp" component={OwnerSignUp} />
                <Route path="/ownerProfile" component={OwnerUpdate} />
                <Route path="/section" component={Section}/>
                <Route path="/addItem" component={AddItem}/>
                <Route path="/itemDetail" component={ItemDetail}/>
                <Route path="/searchBar" component={SearchBar}/>
                <Route path="/restaurant" component={Restaurant}/>
                <Route path="/pastOrder" component={PastOrder}/>
                <Route path="/upcomingOrder" component={UpcomingOrders}/>
                <Route path="/ownerPastOrder" component={OwnerPastOrders}/>
                <Route path="/manageOrder" component={ManageOrders}/>

            </div>
            )
        }
    }
    //Export The Main Component
export default Main;