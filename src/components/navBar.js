import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Toolbar, withStyles, InputBase,AppBar } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';

const styles = theme => ({
    navbar: {
        position: 'relative',
        backgroundColor: '#000a12'
    },
    appBar: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
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
  }
});

class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.appBar} container>
      <AppBar className={classes.navbar} position="absolute">
        <Toolbar>
          <form className={classes.search} noValidate autoComplete="off">
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onChange={this.handlSearchChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </form>
        </Toolbar>
        </AppBar>
      </Grid>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
