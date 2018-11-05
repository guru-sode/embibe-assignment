import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import StudentDetails from './components/studentDetails';
import Login from './components/login';

class App extends Component {
  render() {
    // document.cookie.split(";")
    // .forEach(function (c) { 
    //   document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")});
    console.log(document.cookie, 'in APP');
    return (
      <BrowserRouter>
      <div className="App">
      <Route exact path="/" component={Login} />
      <Route  exact path="/:id" component={StudentDetails}/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
