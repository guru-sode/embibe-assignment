import React, { Component } from 'react';
import '../styles/card.css';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const styles = theme => ({
  progressContainer: {
      display: 'flex',
      justifyContent: 'center'
  },
  progress: {
      margin: theme.spacing.unit * 2,
      textAlign: 'center',
      color: '#000a12'
  }
});

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
          marksDOM.push(<h3 key={index}>{this.state.subjectNames[index]}:{mark}</h3>)
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
    const { classes } = this.props;
    return (
        <div className="details-container">
        {this.state.name==='' ?
        <Grid className={classes.progressContainer} container>
        <CircularProgress className={classes.progress} size={100} />
    </Grid> :<div><h1>{this.state.name}</h1>
    <h2>Class:{this.state.standard}</h2>
    <h2>Roll Number:{this.state.rollNo}</h2>
    {this.displayMarks()}</div>
        }
        </div>
    );
  }
}

StudentDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default  withStyles(styles)(StudentDetails);
