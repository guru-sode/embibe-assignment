import React, { Component } from 'react';
import '../styles/card.css';
import { NavLink } from 'react-router-dom';

class SignIn extends Component {
    constructor(){
        super();
        this.state={
          names:[],
          rollNos:[],
          totalMarks:[]
        };
        this.renderCards=this.renderCards.bind(this);
    }

    renderCards(){
      let displayName=[];
      this.state.names.map((name,index)=>{
          displayName.push(<div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
          <div className="our-team">
            <div className="picture">
            <img className="img-fluid" src={require('../data/student.jpg')} alt="student"/>
            </div>
            <div className="team-content">
              {name}
              <h4 className="title">Roll Number:{this.state.rollNos[index]}</h4>
              <h4 className="title">Total marks:{this.state.totalMarks[index]}</h4>
              <NavLink to={`/${this.state.rollNos[index]}`}><button type="button" className="details">Details</button></NavLink>
            </div>
          </div>
        </div>)
        return displayName;
      });
      return displayName;
    }

    componentDidMount = () => {
        let names=[];
        let rollNos=[];
        let id;
        let marks;
        let sum=0;
        let totalMarks=[];
          fetch('https://api.myjson.com/bins/1dlper')
            .then(response => response.json())
            .then(data => {
              id=Object.keys(data);
              id.map(student=>{
                names.push(data[student]["name"]);
                rollNos.push(data[student]["rollNo"]);
                marks=Object.values(data[student]["marks"]);
                marks.map(mark=>{
                  sum=sum+mark;
                  return sum;
                })
                totalMarks.push(sum);
                sum=0;
                return totalMarks;
              })
                this.setState({
                  names,
                  rollNos,
                  totalMarks,
                })
              });
      };

    render() { 
        return (
          <div className="container">
          <div className="row">
          {this.renderCards()}
            </div>
            </div>
          );
    }
}
 
export default SignIn;