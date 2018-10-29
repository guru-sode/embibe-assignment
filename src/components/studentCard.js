import React, { Component } from 'react';
import '../styles/card.css';
import { NavLink } from 'react-router-dom';
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

class StudentCard extends Component {
    constructor(props){
        super(props);
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
      const { classes } = this.props;
        return (
          <div className="container">
          <div className="row">
          {this.state.names[0]===undefined ?
          <Grid className={classes.progressContainer} container>
          <CircularProgress className={classes.progress} size={100} />
      </Grid> : this.renderCards()
          }
            </div>
            </div>
          );
    }
}

StudentCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default  withStyles(styles)(StudentCard);