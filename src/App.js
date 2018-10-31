import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import StudentCard from './components/studentCard';
import StudentDetails from './components/studentDetails';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Route exact path="/" component={StudentCard} />
      <Route  path="/:id" component={StudentDetails}/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
