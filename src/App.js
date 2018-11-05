import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import StudentCard from './components/studentCard';
import StudentDetails from './components/studentDetails';
import Login from './components/login';

class App extends Component {
  render() {
    console.log(document.cookie)
    return (
      <BrowserRouter>
      <div className="App">
      <Route exact path="/" component={Login} />
      {/* {document.cookie==='' ? (<Route exact path="/" component={Login} />):(<Route exact path="/" component={StudentCard} />)} */}
      <Route  exact path="/:id" component={StudentDetails}/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
