import React, { Component } from 'react';
import '../styles/card.css';

class StudentDetails extends Component {
  constructor() {
    super();
    this.state={
        name:'',
        standard:'',
        rollNo:'',
        marks:[],
        subjectNames:[]
    };
    this.displayMarks=this.displayMarks.bind(this);
  }

  displayMarks(){
      let marksDOM=[];
      this.state.marks.map((mark,index)=>{
          marksDOM.push(<h3>{this.state.subjectNames[index]}:{mark}</h3>)
          return marksDOM;
      });
      return marksDOM;
  }

  componentDidMount = () => {
      let name;
      let standard;
      let rollNo;
      let subjects;
      let marks;
      let subjectNames;
    fetch('https://api.myjson.com/bins/1dlper')
    .then(response => response.json())
    .then(data => {
        name=data[this.props.match.params.id]["name"];
        standard=data[this.props.match.params.id]["class"];
        rollNo=data[this.props.match.params.id]["rollNo"];
        subjects=data[this.props.match.params.id]["marks"];
        marks=Object.values(subjects);
        subjectNames=Object.keys(subjects);
        this.setState({
            name,
            standard,
            rollNo,
            marks,
            subjectNames
        });
    });
}

  render() {
    return (
        <div className="details-container">
    <h1>{this.state.name}</h1>
    <h2>Class:{this.state.standard}</h2>
    <h2>Roll Number:{this.state.rollNo}</h2>
    <h2>{this.displayMarks()}</h2>
    </div>
    );
  }
}

export default StudentDetails;
