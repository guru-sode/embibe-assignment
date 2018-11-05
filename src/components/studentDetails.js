import React, { Component } from 'react';
import '../styles/details.css';
import { Grid,Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import { NavLink } from 'react-router-dom';


const styles = theme => ({
  progressContainer: {
      display: 'flex',
      justifyContent: 'center'
  },
  progress: {
      margin: theme.spacing.unit * 2,
      textAlign: 'center',
      color: '#000a12'
  },
  button:{
    margin:'2%'
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

  showGraph(){
    var returnObj = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Marks obtained per each subject'
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Marks'
          }
        },
        legend: {
          reversed: true
        },
        plotOptions: {
          series: {
            stacking: 'normal'
          }
        },
        series: [{
            name:this.state.name,
            data:this.state.marks
        }]
      };
      returnObj.xAxis.categories=this.state.subjectNames;
      Highcharts.chart('highchart-container', returnObj);
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
      if(data[this.props.match.params.id]!==undefined){
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
      }
      else{
        this.setState({
          name:'Roll Number not found',
          standard:'Not applicable',
        })
      }
    });
}

  render() {
    const { classes } = this.props;
    return (
        <div className="details-container">
        {this.state.name==='' ?
        <Grid className={classes.progressContainer} container>
        <CircularProgress className={classes.progress} size={100} />
    </Grid> :
    <div id="vcard">
        <div id="card-content">
          <h3>Student details</h3>
          <div id="profile">
            <span className="avatar">
              <span className="typicons-user icon" />
              <span className="info">
                {this.state.name}
                <br />
                Class:
                {this.state.standard}
                <br />
                Marks obtained:
                {this.displayMarks()}
              </span>
            </span>
            <Button variant="outlined" color="secondary" className={classes.button} onClick={this.showGraph.bind(this)}>
            Show Graph
      </Button>
      <NavLink to="/" style={{ textDecoration: 'none' }}><Button variant="outlined" color="secondary" className={classes.button} onClick={this.showGraph.bind(this)}>
            Back
      </Button></NavLink>
          </div>
        </div>
        </div>
        }
        <div id="highchart-container"></div>
         </div> 
    );
  }
}

StudentDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default  withStyles(styles)(StudentDetails);
