import React, { useEffect, useState } from "react";
import auth from "../auth/auth-helper";
import { read } from "./api-user";
import { Link } from "react-router-dom";
import { IconButton, ListItemSecondaryAction } from "@mui/material";
import { Edit } from "@mui/icons-material";
import DeleteUser from "./DeleteUser";

import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Person } from "@mui/icons-material";

import { Navigate, useParams } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    padding: 24,
    marginTop: 40,
  },
  title: {
    marginTop: 20,
    color: "#3f4771",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { userId } = useParams();

  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  const jwt = auth.isAuthenticated();
  console.log(jwt)

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const jwt = auth.isAuthenticated();

    read({ userId: userId }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [userId]);

  if (redirectToSignin) {
    return <Navigate to="/signin" />;
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>

      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user?.name} secondary={user?.email} />

          {jwt?.user && jwt?.user?._id === user?._id && (
            <ListItemSecondaryAction>
              <Link to={"/user/edit/" + user._id}>
                <IconButton aria-label="Edit" color="primary">
                  <Edit />
                </IconButton>
              </Link>

              <DeleteUser userId={user._id} />
            </ListItemSecondaryAction>
          )}
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary={
              user?.created
                ? "Joined: " + new Date(user?.created).toDateString()
                : ""
            }
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default Profile;
