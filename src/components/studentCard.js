import React, { Component } from 'react';
import '../styles/card.css';
import { NavLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Toolbar, AppBar, Button } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import { loadData } from '../redux/actions';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
    color:'inherit'
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  button: {
    margin: '2%',
    border: '1px solid black',
    color:'white',
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 2,
    justifyContent: 'center',
    marginLeft: '900px',
    marginTop: '450px',
    color: '#000a12'
  },
  close: {
    padding: theme.spacing.unit / 2
  }
});

let toggleNameflag = false;
let toggleMarksflag = false;

class StudentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      copyForSearch: [],
      nameOpen: false,
      marksOpen: false,
      searchResult: true,
      isFetching: true
    };
    this.renderCards = this.renderCards.bind(this);
    this.handlSearchChange = this.handlSearchChange.bind(this);
    this.toggleName = this.toggleName.bind(this);
    this.toggleMarks = this.toggleMarks.bind(this);
    this.emptyCard = this.emptyCard.bind(this);
  }

  emptyCard() {
    return (
        <div className="our-team-empty">
          No results found
        </div>
    );
  }

  handlSearchChange(event) {
    let search = '^' + event.target.value;
    let flag = 'i';
    let reg = new RegExp(search, flag);
    let newStudents = [];
    this.state.copyForSearch.map(student => {
      if (reg.test(student['name'])) {
        newStudents.push(student);
      }
      return newStudents;
    });
    if (newStudents[0] !== undefined) {
      this.setState({
        students: newStudents,
        searchResult: true
      });
    } else {
      this.setState({
        searchResult: false
      });
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      nameOpen: false,
      marksOpen: false
    });
  };

  toggleName() {
    this.setState({
      nameOpen: true
    });
    if (toggleNameflag === true) {
      let sortNames = this.state.students.sort(function(a, b) {
        var nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      let reverse = sortNames.reverse();
      this.setState({
        students: reverse
      });
    }
    if (toggleNameflag === false) {
      let sortNames = this.state.students.sort(function(a, b) {
        var nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      this.setState({
        student: sortNames
      });
    }
    toggleNameflag = toggleNameflag ? false : true;
  }

  toggleMarks() {
    this.setState({
      marksOpen: true
    });
    if (toggleMarksflag === true) {
      let sortMarks = this.state.students.sort(function(a, b) {
        return a.totalMarks - b.totalMarks;
      });
      let reverse = sortMarks.reverse();
      this.setState({
        students: reverse
      });
    }
    if (toggleMarksflag === false) {
      let sortMarks = this.state.students.sort(function(a, b) {
        return a.totalMarks - b.totalMarks;
      });
      this.setState({
        students: sortMarks
      });
    }
    toggleMarksflag = toggleMarksflag ? false : true;
  }

  renderCards() {
    console.log(this.props.students);
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
              {student['name']}
              <h1 className="title">
                Roll Number:
                {student['rollNo']}
              </h1>
              <h4 className="title">
                Total marks:
                {student['totalMarks']}
              </h4>
              <NavLink
                to={`/${student['rollNo']}`}
                style={{ textDecoration: 'none' }}
              >
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
    this.props.loadData();
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
          students,
          copyForSearch: students
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isFetching: false
        })
      });
  };

  render() {
    const { classes } = this.props;
    return (
      this.state.isFetching ? 
      <div className="container">
        {this.state.students[0] === undefined  ? (
          <Grid className={classes.progressContainer} container>
            <CircularProgress className={classes.progress} size={100} />
          </Grid>
        ) : (
          <div className={classes.root}>
          <AppBar>
            <Toolbar>
              <Typography className={classes.title} variant="h3" color="inherit" noWrap>
                Dashboard
              </Typography>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange={this.handlSearchChange}
                />
              </div>
              <Button
                  variant="text"
                  color="primary"
                  className={classes.button}
                  onClick={this.toggleName}
                >
                  Sort by name
                </Button>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                  }}
                  open={this.state.nameOpen}
                  autoHideDuration={2000}
                  onClose={this.handleClose}
                  ContentProps={{
                    'aria-describedby': 'message-id'
                  }}
                  message={
                    <span id="message-id">
                      {toggleNameflag === false
                        ? 'Sorted by names (Z-A)'
                        : 'Sorted by names (A-Z)'}
                    </span>
                  }
                  action={[
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      className={classes.close}
                      onClick={this.handleClose}
                    >
                      <CloseIcon />
                    </IconButton>
                  ]}
                />
                <Button
                  variant="text"
                  color="primary"
                  className={classes.button}
                  onClick={this.toggleMarks}
                >
                  Sort by marks
                </Button>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                  }}
                  open={this.state.marksOpen}
                  autoHideDuration={2000}
                  onClose={this.handleClose}
                  ContentProps={{
                    'aria-describedby': 'message-id'
                  }}
                  message={
                    <span id="message-id">
                      {toggleMarksflag === false
                        ? 'Sorted by marks (high-low)'
                        : 'Sorted by names (low-high)'}
                    </span>
                  }
                  action={[
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      className={classes.close}
                      onClick={this.handleClose}
                    >
                      <CloseIcon />
                    </IconButton>
                  ]}
                />
            </Toolbar>
          </AppBar>
        </div>
        )}
        <div className="row">
          {this.state.searchResult ? this.renderCards() : this.emptyCard()}
        </div>
      </div> : (<h1>This page isn't available
The link you followed may be broken, or the page may have been removed.</h1>)
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.students
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => dispatch(loadData()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(StudentCard);
