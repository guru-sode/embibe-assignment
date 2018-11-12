import React, { Component } from 'react';
import '../styles/card.css';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom'
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
import { loadData , sortName , sortNameZA ,sortMarksLH , sortMarksHL,searchNames } from '../redux/actions';

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
      isFetching: true,
    };
    this.props.loadData();
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
      let res=this.props.searchNames(this.state.students,event.target.value);
      if(res.searchResult.length===0){
        this.setState({
          searchResult:false
        })
      }
      else{
        this.setState({
          searchResult:true
        })
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
      this.props.sortNameZA(this.props.students);
    }
    if (toggleNameflag === false) {
      this.props.sortName(this.props.students);
    }
    toggleNameflag = toggleNameflag ? false : true;
  }

  toggleMarks() {
    this.setState({
      marksOpen: true
    });
    if (toggleMarksflag === true) {
      this.props.sortMarksHL(this.props.students);
    }
    if (toggleMarksflag === false) {
      this.props.sortMarksLH(this.props.students);
    }
    toggleMarksflag = toggleMarksflag ? false : true;
  }

  renderCards() {
    let displayName = [];
    if(this.props.students!==undefined){
    this.props.students.map((student, index) => {
      displayName.push(
        <Grid component={Link} style={{ textDecoration: 'none',color: 'black' }} to={`/${student['rollNo']}`} key={index}>
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
                >
                  Details
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
        </Grid>
      );
      return displayName;
    });
}
    return displayName;
  }

  componentWillMount = () => {
    setTimeout(()=>{
      this.setState({
        students: this.props.students,
        copyForSearch:this.props.students,
        isFetching:this.props.isFetching
      });
    },1000);
  }


  render() {
    const { classes } = this.props;
    return (
      this.props.isFetching===true ? 
      <div className="container">
        {this.props.students === undefined  ? (
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
                  value={this.props.input}
                />
              </div>
              <Button
                  variant="text"
                  color="primary"
                  className={classes.button}
                  onClick={this.toggleName}
                >
                  {toggleNameflag===false ? 'Sort by name(A-Z)':'Sort by name(Z-A)'}
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
                  {toggleMarksflag===false ? 'Sort by marks(low-high)':'Sort by marks(high-low)'}
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
    students: state.students,
    isFetching:state.isFetching,
    };
};

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => dispatch(loadData()),
    sortName: (data)=>dispatch(sortName(data)),
    sortNameZA: (data)=>dispatch(sortNameZA(data)),
    sortMarksLH:(data)=>dispatch(sortMarksLH(data)),
    sortMarksHL:(data)=>dispatch(sortMarksHL(data)),
    searchNames:(data,input)=>dispatch(searchNames(data,input))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(StudentCard);
