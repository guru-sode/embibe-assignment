import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route  } from 'react-router-dom';
import StudentDetails from './components/studentDetails';
import Login from './components/login';
import ErrorComp from './components/errorComp';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loadData } from '../src/redux/actions';

class App extends Component {
  constructor(props){
    super(props);
    this.props.loadData();
  }
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
      <Route path="/:id/*"component={ErrorComp} />
      </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    rawData: state.rawData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => dispatch(loadData()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(App);
