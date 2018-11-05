import React, { Component } from 'react';
import { Grid, TextField, Card, CardContent, Button, CardActions, withStyles, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
import StudentCard from './studentCard';

const styles = theme => ({
    main: {
        display: 'flex',
        justifyContent: 'center',
        margin:'50%',
        marginLeft:'50%'
    },
    card: {
        width: 400,
        height: 'auto',
        padding: '1em',
        marginTop: '2em',
        textAlign: 'center',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
    },
    loginButton: {
        backgroundColor: '#000a12',
        color: 'white',
        "&:hover": {
            backgroundColor: "#000a12"
        }
    },
    registerButton: {
        backgroundColor: '#000a12',
        color: 'white',
        "&:hover": {
            backgroundColor: "#000a12"
        },
        textDecoration: 'none',
        marginRight: '0.65em',
        marginTop: '0.5em',
    },
    loginButtonsContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    navlink: {
        textDecoration: 'none',
        color: 'white',
    }
});

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        };
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }


    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    submitLoginForm = () => {
        document.cookie= `username=${this.state.email};password=${this.state.password}; path=/`;
    }

    render() {

        const { classes } = this.props;
        return (
            <div>
            {document.cookie==='' ? (
                <Grid container className={classes.main}>
                <Grid item>
                    <Card className={classes.card}>
                        <Typography component="h1" variant="h4">
                            Login
                        </Typography>
                        <CardContent className={classes.content}>
                            <TextField
                                id="email-input"
                                onChange={this.handleEmailChange}
                                label="Email"
                                className={classes.textField}
                                type="email"
                                name="email"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="password-input"
                                onChange={this.handlePasswordChange}
                                label="Password"
                                className={classes.textField}
                                type="password"
                                name="password"
                                margin="normal"
                                variant="outlined"
                            />
                        </CardContent>
                        <CardActions className={classes.loginButtonsContainer}>
                           <NavLink to="/"><Button onClick={this.submitLoginForm} variant="contained" className={classes.loginButton} align="end">Login</Button></NavLink>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            ):(<Route exact path="/" component={StudentCard} />)}
            </div>
        );
    }
}

export default withStyles(styles)(Login);