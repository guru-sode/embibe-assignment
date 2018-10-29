import React, { Component } from 'react';
import '../styles/card.css';
import { NavLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Toolbar,
  AppBar,
  Button,
  TextField
} from '@material-ui/core';
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

let toggleNameflag=false;
let toggleMarksflag=false;

class StudentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      rollNos: [],
      totalMarks: []
    };
    this.renderCards = this.renderCards.bind(this);
    this.handlSearchChange = this.handlSearchChange.bind(this);
    this.toggleName=this.toggleName.bind(this);
    this.toggleMarks=this.toggleMarks.bind(this);
  }

  handlSearchChange(event) {
    event.preventDefault();
    console.log(document.getElementById('standard-with-placeholder').value);
    document.getElementById('standard-with-placeholder').value='';
  }

  toggleName(){
    if(toggleNameflag===true){
      let sortNames=this.state.names.sort();
      let reverse=sortNames.reverse();
      this.setState({
        names:reverse
      });

    }
    if(toggleNameflag===false){
      let sortNames=this.state.names.sort();
      this.setState({
        names:sortNames
      });
    }
    toggleNameflag=toggleNameflag ? false:true;
  }

  toggleMarks(){
    if(toggleMarksflag===true){
      let sortMarks=this.state.totalMarks.sort();
      let reverse=sortMarks.reverse();
      this.setState({
        totalMarks:reverse
      });

    }
    if(toggleMarksflag===false){
      let sortMarks=this.state.totalMarks.sort();
      this.setState({
        totalMarks:sortMarks
      });
    }
    toggleMarksflag=toggleMarksflag ? false:true;
  }

  renderCards() {
    let displayName = [];
    this.state.names.map((name, index) => {
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
              {name}
              <h4 className="title">
                Roll Number:
                {this.state.rollNos[index]}
              </h4>
              <h4 className="title">
                Total marks:
                {this.state.totalMarks[index]}
              </h4>
              <NavLink to={`/${this.state.rollNos[index]}`}>
                <button type="button" className="details">
                  Details
                </button>
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
    let names = [];
    let rollNos = [];
    let id;
    let marks;
    let sum = 0;
    let totalMarks = [];
    fetch('https://api.myjson.com/bins/1dlper')
      .then(response => response.json())
      .then(data => {
        id = Object.keys(data);
        id.map(student => {
          names.push(data[student]['name']);
          rollNos.push(data[student]['rollNo']);
          marks = Object.values(data[student]['marks']);
          marks.map(mark => {
            sum = sum + mark;
            return sum;
          });
          totalMarks.push(sum);
          sum = 0;
          return totalMarks;
        });
        this.setState({
          names,
          rollNos,
          totalMarks
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
                <TextField
                  id="standard-with-placeholder"
                  label="Search..."
                />
              </form>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={this.handlSearchChange}
              >
                Submit
              </Button>
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
          {this.state.names[0] === undefined ? (
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
