import React, { Component } from 'react';
import axios from 'axios';
import '../Calculator.css';

class Calculator extends Component {

    constructor() {
        super();
        this.state = {
            key: "",
            calstring: ""
        }
        //Bind the handlers to this class
        this.keyInputHandler = this.keyInputHandler.bind(this);
        this.keyPrintHandler = this.keyPrintHandler.bind(this);



    }
    keyInputHandler = (e) => {

        if ((e.target.name === '+' || e.target.name === '-' || e.target.name === '/' || e.target.name === '*' || e.target.name === '.')) {
            if (this.state.calstring[this.state.calstring.length - 1] !== '+' && this.state.calstring[this.state.calstring.length - 1] !== '-' && this.state.calstring[this.state.calstring.length - 1] !== '/' && this.state.calstring[this.state.calstring.length - 1] !== '*') {
                this.setState({
                    key: e.target.name,
                    calstring: this.state.calstring + e.target.name,

                });
            }

        } else {
            this.setState({
                key: e.target.name,
                calstring: this.state.calstring + e.target.name,

            });
            console.log("calstring is: " + this.state.calstring);
            console.log(this.state.key);
        }

    }
    keyPrintHandler = (e) => {
        const calstring = { 'key': this.state.calstring };
        axios.post('http://3.15.185.248:3001/calculate', calstring)
            .then((response) => {
                console.log("Status Code : ", response.status);
                if (response.status === 200 && response.data != null) {
                    this.setState({
                        calstring: response.data
                    });
                    console.log("response.data output ", response.data);

                } else {
                    this.setState({
                        calstring: "error"
                    });
                }
            }).catch(error => {
                this.setState({
                    calstring: "error"
                })
            })
    }

    keyClearHandler = (e) => {
        this.setState({
            calstring: ""
        })

    }

    render() {
        return (
            <div class="calculator" >
                <center><h1 >Calculator</h1></center>
                <div>
                    <input value={this.state.calstring} type="text" class="cal-display z-depth-1" readOnly placeholder="Calculator" required />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button name="C" class="clear" onClick={this.keyClearHandler}>AC</button>
                </div>
                <div class="calculator-keys">
                    <button name="7" onClick={this.keyInputHandler}>7</button>
                    <button name="8" onClick={this.keyInputHandler}>8</button>
                    <button name="9" onClick={this.keyInputHandler}>9</button>
                    <button name="/" onClick={this.keyInputHandler}>/</button>

                    <button name="4" onClick={this.keyInputHandler}>4</button>
                    <button name="5" onClick={this.keyInputHandler}>5</button>
                    <button name="6" onClick={this.keyInputHandler}>6</button>
                    <button name="*" onClick={this.keyInputHandler}>*</button>

                    <button name="1" onClick={this.keyInputHandler}>1</button>
                    <button name="2" onClick={this.keyInputHandler}>2</button>
                    <button name="3" onClick={this.keyInputHandler}>3</button>
                    <button name="." onClick={this.keyInputHandler}>.</button>

                    <button name="+" onClick={this.keyInputHandler}>+</button>
                    <button name="0" onClick={this.keyInputHandler}>0</button>
                    <button name="-" onClick={this.keyInputHandler}>-</button>
                    <button name="equal" type="submit" class="equal-sign operator btn btn-default" onClick={this.keyPrintHandler}>=</button>

                </div>

            </div>
        )
    }
}

export default Calculator;