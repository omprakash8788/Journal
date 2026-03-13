import React, { useState, useEffect } from "react";

import { read, update } from "./api-user.js";
import { Navigate, useParams } from "react-router-dom";
import auth from "../auth/auth-helper";
// import { makeStyles } from "@mui/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { FileUpload } from "@mui/icons-material";

// const useStyles = makeStyles((theme) => ({
//   card: {
//     maxWidth: 600,
//     margin: "auto",
//     textAlign: "center",
//     marginTop: theme.spacing(5),
//     paddingBottom: theme.spacing(2),
//   },
//   title: {
//     margin: theme.spacing(2),
//     color: theme.palette.protectedTitle,
//   },
//   error: {
//     verticalAlign: "middle",
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 300,
//   },
//   submit: {
//     margin: "auto",
//     marginBottom: theme.spacing(2),
//   },
// }));

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    card: {
      maxWidth: 600,
      margin: "auto",
      textAlign: "center",
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2),
    },
    title: {
      margin: theme.spacing(2),
      color: theme.palette.protectedTitle,
    },
    error: {
      verticalAlign: "middle",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300,
    },
    submit: {
      margin: "auto",
      marginBottom: theme.spacing(2),
    },
  };
});

export default function EditProfile() {
  const classes = useStyles();
  const { userId } = useParams();
  const jwt = auth.isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    about: "",
    photo: "",
    error: "",
    redirectToProfile: false,
    userId: "",
  });

  console.log(values);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId: userId }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        setValues((prev) => ({
          ...prev,
          name: data?.name,
          email: data?.email,
        }));
      }
    });

    return () => abortController.abort();
  }, [userId]);

  const clickSubmit = () => {
    let userData = new FormData();
    values.name && userData.append("name", values.name);
    values.email && userData.append("email", values.email);
    values.password && userData.append("password", values.password);
    values.about && userData.append("about", values.about);
    values.photo && userData.append("photo", values.photo);
    // const user = {
    //   name: values.name || undefined,
    //   email: values.email || undefined,
    //   password: values.password || undefined,
    // };
    update({ userId: userId }, { t: jwt.token }, userData).then((data) => {
      if (data && data.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        setValues((prev) => ({
          ...prev,
          userId: data?._id,
          redirectToProfile: true,
        }));
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  if (values.redirectToProfile) {
    return <Navigate to={"/user/" + values.userId} />;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Edit Profile
        </Typography>

        <TextField
          label="Name"
          className={classes.textField}
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
        />
        <br />
        <TextField
          id="multiline-flexible"
          label="About"
          multiline
          rows="2"
          value={values.about}
          onChange={handleChange("about")}
        />

        <br />

        <TextField
          type="email"
          label="Email"
          className={classes.textField}
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
        />
        <br />

        <TextField
          type="password"
          label="Password"
          className={classes.textField}
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
        />
        <br />
        <input
          accept="image/*"
          type="file"
          onChange={handleChange("photo")}
          style={{ display: "none" }}
          id="icon-button-file"
        />
        <label htmlFor="icon-button-file">
          <Button variant="contained" color="default" component="span">
            Upload <FileUpload />
          </Button>
        </label>

        <span className={classes.filename}>
          {values.photo ? values.photo.name : ""}
        </span>

        <br />

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
}
