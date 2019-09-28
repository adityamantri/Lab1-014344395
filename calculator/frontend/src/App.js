import React, {Component} from 'react';

import Calculator from './components/Calculator';
import {BrowserRouter} from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Calculator/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
