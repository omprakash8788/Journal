import React, { useState } from "react";
import { signin } from "./api-auth";
import auth from "./auth-helper";
import { makeStyles } from "@mui/styles";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Icon,
} from "@mui/material";

import { Navigate, useLocation } from "react-router-dom";

const useStyles = makeStyles(() => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: 40,
    paddingBottom: 20,
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: 20,
    color: "#3f4771",
  },
  textField: {
    marginLeft: 8,
    marginRight: 8,
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: 16,
  },
}));

const Signin = () => {
  const classes = useStyles();
  const location = useLocation();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const from = location.state?.from?.pathname || "/";

  const clickSubmit = () => {
    if (!values.email || !values.password) {
      setValues({
        ...values,
        error: "Email and Password are required",
      });
      return;
    }

    const user = {
      email: values.email,
      password: values.password,
    };

    signin(user).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({
            ...values,
            error: "",
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  if (values.redirectToReferrer) {
    return <Navigate to={from} />;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Sign In
        </Typography>

        <TextField
          type="email"
          label="Email"
          className={classes.textField}
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
        />

        <TextField
          type="password"
          label="Password"
          className={classes.textField}
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
        />

        {values.error && (
          <Typography component="p" color="error">
            <Icon color="error" className={classes.error}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={clickSubmit}
          className={classes.submit}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default Signin;
