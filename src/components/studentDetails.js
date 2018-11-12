import React, { Component } from 'react';
import '../styles/details.css';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loadData } from '../redux/actions';

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
  button: {
    margin: '2%'
  }
});

class StudentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      standard: '',
      rollNo: '',
      marks: [],
      subjectNames: [],
      isValid: true,
      isFetching: true
    };
    this.displayMarks = this.displayMarks.bind(this);
  }

  displayMarks() {
    let marksDOM = [];
    this.state.marks.map((mark, index) => {
      marksDOM.push(
        <h3 key={index}>
          {this.state.subjects[index].toUpperCase()}:{mark}
        </h3>
      );
      return marksDOM;
    });
    return marksDOM;
  }

  showGraph() {
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
      series: [
        {
          name: this.state.name,
          data: this.state.marks
        }
      ]
    };
    returnObj.xAxis.categories = this.state.subjectNames;
    Highcharts.chart('highchart-container', returnObj);
  }

  componentDidMount = () => {
    let self = this;
    setTimeout(() => {
      self.setState({
        data: this.props.students
      });
      let name;
      let rollNo;
      let subjects;
      let marks;
      let standard;
      // && this.state.data[this.props.match.params.id]!==undefined
      if (this.state.data !== undefined) {
        this.state.data.map(students => {
          if (students['rollNo'] == this.props.match.params.id) {
            name = students['name'];
            rollNo = this.props.match.params.id;
            marks = Object.values(students['indMarks']);
            subjects = Object.keys(students['indMarks']);
            standard=students['class'];
          }
        });
        this.setState({
          name,
          rollNo,
          standard,
          marks,
          subjects
        });
      } else {
        this.setState({
          name: 'Not found',
          isValid: false
        });
      }
    }, 1000);
  };

  render() {
    const { classes } = this.props;
    return this.state.name !== undefined ? (
      <div className="details-container">
        {this.state.name === '' ? (
          <div className={classes.progressContainer}>
            <CircularProgress className={classes.progress} size={100} />
          </div>
        ) : this.state.isValid ? (
          <div id="vcard">
            <h3>Student details</h3>
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
                <br />
                {this.showGraph()}
              </span>
            </span>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={this.showGraph.bind(this)}
              >
                Back
              </Button>
            </NavLink>
          </div>
        ) : (
          <h1>Student not found</h1>
        )}
        <div
          id="highchart-container"
          style={{
            minWidth: '310px',
            maxWidth: '800px',
            height: '500px',
            margin: '10%'
          }}
        />
      </div>
    ) : (
      <h1>
        This page isn't available The link you followed may be broken, or the
        page may have been removed.
      </h1>
    );
  }
}

StudentDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    students: state.students
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => dispatch(loadData())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(StudentDetails);
