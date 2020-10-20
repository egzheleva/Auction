import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link,
} from "@material-ui/core";

import './Login.css';
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();

  const [user, setUser] = useState({username: "", password: "", authflag: 1});

  function updateValue(event) {
    setUser({...user, 
        [event.target.name]: 
            event.target.type === 'checkbox' ? event.target.checked : event.target.value
    });
}

  function handleSubmit(event) {
    event.preventDefault();
    if (
      user.username === "admin@admin" &&
      user.password === "admin"
    ) {
      history.push(`/campaigns`);
    } else {
      alert("Incorrect Credentials!");
    }
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
              <Grid item>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={handleSubmit}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        type="email"
                        placeholder="Email"
                        fullWidth
                        name="username"
                        variant="outlined"
                        value={user.username}
                        onChange={updateValue}
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="password"
                        placeholder="Password"
                        fullWidth
                        name="password"
                        variant="outlined"
                        value={user.password}
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
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot Password?
                </Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
    );
  }
