import React, { Component } from 'react';
import '../styles/card.css';
import { NavLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Toolbar, AppBar, Button, TextField } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  navbar: {
    position: 'relative',
    backgroundColor: '#000a12',
    width: '100%'
  },
  appBar: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  searchTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '50%',
    color: 'white'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    marginLeft: '70%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: '2%'
  },
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

let toggleNameflag = false;
let toggleMarksflag = false;

class StudentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
    this.renderCards = this.renderCards.bind(this);
    this.handlSearchChange = this.handlSearchChange.bind(this);
    this.toggleName = this.toggleName.bind(this);
    this.toggleMarks = this.toggleMarks.bind(this);
  }

  handlSearchChange(event) {
    let search=event.target.value;
    let flag='i';
    let reg=new RegExp(search,flag);
    let newStudents=[];
    this.state.students.map((student)=>{
      if(reg.test(student["name"])){
        newStudents.push(student)
      }
      return newStudents
    })
    if(newStudents[0]!==undefined){
      this.setState({
        students:newStudents
      });
    }
  }

  toggleName() {
    if (toggleNameflag === true) {
      let sortNames = this.state.students.sort(function(a, b) {
        var nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA < nameB)
          return -1;
        if (nameA > nameB) 
        return 1;
        return 0;
      });
      let reverse = sortNames.reverse();
      this.setState({
        students: reverse
      });
    }
    if (toggleNameflag === false) {
      let sortNames = this.state.students.sort(function(a,b){
        var nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA < nameB)
          return -1;
        if (nameA > nameB) 
        return 1;
        return 0;
      });
      this.setState({
        student: sortNames
      });
    }
    toggleNameflag = toggleNameflag ? false : true;
  }

  toggleMarks() {
    if (toggleMarksflag === true) {
      let sortMarks = this.state.students.sort(function(a,b){
        return a.totalMarks-b.totalMarks;
      });
      let reverse = sortMarks.reverse();
      this.setState({
        students: reverse
      });
    }
    if (toggleMarksflag === false) {
      let sortMarks = this.state.students.sort(function(a,b){
        return a.totalMarks-b.totalMarks;
      });
      this.setState({
        students: sortMarks
      });
    }
    toggleMarksflag = toggleMarksflag ? false : true;
  }

  renderCards() {
    let displayName = [];
    this.state.students.map((student, index) => {
      displayName.push(
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
          <div className="our-team">
            <div className="picture">
              <img
                className="img-fluid"
                src={require('../data/student.jpg')}
                alt="student"
              />
            </div>
            <div className="team-content">
              {student["name"]}
              <h4 className="title">
                Roll Number:
                {student["rollNo"]}
              </h4>
              <h4 className="title">
                Total marks:
                {student["totalMarks"]}
              </h4>
              <NavLink to={`/${student["rollNo"]}`} style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.toggleMarks}
              >
                Details
              </Button>
              </NavLink>
            </div>
          </div>
        </div>
      );
      return displayName;
    });
    return displayName;
  }

  componentDidMount = () => {
    let id;
    let marks;
    let sum = 0;
    let totalMarks = [];
    let students = [];
    fetch('https://api.myjson.com/bins/1dlper')
      .then(response => response.json())
      .then(data => {
        id = Object.keys(data);
        id.map(student => {
          marks = Object.values(data[student]['marks']);
          marks.map(mark => {
            sum = sum + mark;
            return sum;
          });
          totalMarks.push(sum);
          students.push({
            name: data[student]['name'],
            rollNo: data[student]['rollNo'],
            totalMarks: sum
          });
          sum = 0;
          return totalMarks;
        });
        this.setState({
          students
        });
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="container">
        <Grid className={classes.appBar} container>
          <AppBar className={classes.navbar} position="absolute">
            <Toolbar>
              <form className={classes.search} noValidate autoComplete="off">
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <TextField id="standard-with-placeholder" label="Search..." onChange={this.handlSearchChange}/>
              </form>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={this.toggleName}
              >
                Sort based on name
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={this.toggleMarks}
              >
                Sort based on marks
              </Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <div className="row">
          {this.state.students[0] === undefined ? (
            <Grid className={classes.progressContainer} container>
              <CircularProgress className={classes.progress} size={100} />
            </Grid>
          ) : (
            this.renderCards()
          )}
        </div>
      </div>
    );
  }
}

StudentCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentCard);
