import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link,
} from "@material-ui/core";
import USERS_API from '../../service/users-api-client';
import { User } from "../../model/user.model";
import { useHistory } from "react-router-dom";


export default function Registration(props) {
  const history = useHistory();
  
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    passwordConfirmed: "",
    password: ""
  });

  async function handleSubmit(event) {
    event.preventDefault();
    await USERS_API.addUser(newUser);
    resetState();
    history.push(`/campaigns`);
  };

  function resetState() {
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      passwordConfirmed: "",
      password: ""
    })
  };

  function updateValue(event) {
    setNewUser({...newUser, 
        [event.target.name]: 
            event.target.type === 'checkbox' ? event.target.checked : event.target.value
    });
}

    return (
      <div>

        <Grid container spacing={0} justify="center" direction="row">
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={2}
              className="login-form"
            >
              <Paper
                variant="elevation"
                elevation={2}
                className="login-background"
              >
                <Grid item xs >
                  <Typography component="h1" variant="h5">
                    Sign Up
                  </Typography>
                </Grid>
                <Grid item xs>
                  <form onSubmit={handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                          type="text"
                          placeholder="First Name"
                          fullWidth
                          name="firstName"
                          variant="outlined"
                          value={newUser.firstName}
                          onChange={updateValue} 
                          required
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs>
                        <TextField
                          type="text"
                          placeholder="Last Name"
                          fullWidth
                          name="lastName"
                          variant="outlined"
                          value={newUser.lastName}
                          onChange={updateValue} 
                          required
                          
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="email"
                          placeholder="Email"
                          fullWidth
                          name="email"
                          variant="outlined"
                          value={newUser.email}
                          onChange={updateValue} 
                          required
                          
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="password"
                          placeholder="Password"
                          fullWidth
                          name="password"
                          variant="outlined"
                          value={newUser.password}
                          onChange={updateValue} 
                          required
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="password"
                          placeholder="Confirm Password"
                          fullWidth
                          name="passwordConfirmed"
                          variant="outlined"
                          value={newUser.passwordConfirmed}
                          onChange={updateValue} 
                          required
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className="button-block"
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
}
