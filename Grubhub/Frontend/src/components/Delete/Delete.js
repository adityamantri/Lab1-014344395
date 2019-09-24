import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';

class Delete extends Component {

    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            bookId: "",
            authFlag: null,
            error: ""
        }
        //Bind the handlers to this class
        this.bookIdChangeHandler = this.bookIdChangeHandler.bind(this);
    }

    componentDidMount() {
        this.setState({
            authFlag: false,
            error: ""
        })
    }

    //bookID change handler to update state variable with the text entered by the user
    bookIdChangeHandler = (e) => {
        this.setState({
            BookID: e.target.value
        })
    }

    submit = e => {
        console.log("inside submit function");

        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            BookID: this.state.BookID
        }
        //get the books data from backend  

        axios.delete('http://localhost:3001/delete/'+data.BookID)
            .then((response) => {
                //update the state with the response data
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true,
                        error:"Deleted Successfully"
                    })
                }
            }).catch(error => {
                console.log("Inside catch function of delete")
                this.setState({
                    authFlag: false,
                    error: "Invalid Book ID"
                })
            });

    }

    render() {
        //redirect based on successful login
        // console.log("outside if loop authflag value:     ",this.authFlag);
        // if (this.authFlag) {
        //     console.log("this.authflag is " + this.authFlag);
        //     redirectVar = <Redirect to="/home" />
        // }
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }
        if(this.state.authFlag){
            <Redirect to="/home" />
        }
        return (
            <div>
                {redirectVar}
                <div class="container">
                    <form onSubmit={this.submit}>
                        <div style={{ width: "50%", float: "left" }} class="form-group">
                            <input onChange={this.bookIdChangeHandler} type="number" class="form-control" name="BookID" placeholder="Search a Book by Book ID" required/>
                        </div>
                        <div style={{ width: "50%", float: "right" }}>
                            <button class="btn btn-success" type="submit">Delete</button>
                        </div>
                    </form>
                </div>
                <h1>{this.state.error}</h1>
            </div>
        )
    }
}

export default Delete;