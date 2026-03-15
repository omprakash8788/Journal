import React, { useEffect, useState } from "react";
import auth from "../auth/auth-helper";
import { read } from "./api-user";
import { Link } from "react-router-dom";
import { IconButton, ListItemSecondaryAction } from "@mui/material";
import { Edit } from "@mui/icons-material";
import DeleteUser from "./DeleteUser";

const API = import.meta.env.VITE_API_URL;

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
import FollowProfileButton from "./FollowProfileButton";
import FollowGrid from "./FollowGrid";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 550,
    margin: "40px auto",
    padding: 30,
    borderRadius: 14,
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    fontWeight: 600,
    marginBottom: 20,
    color: "#3f4771",
  },

  avatar: {
    width: 90,
    height: 90,
    margin: "auto",
  },

  userName: {
    textAlign: "center",
    fontWeight: 600,
  },

  userEmail: {
    textAlign: "center",
    color: "#777",
  },

  followSection: {
    display: "flex",
    justifyContent: "center",
    padding: "10px 0",
  },

  aboutSection: {
    padding: "10px 0",
    color: "#555",
  },

  joined: {
    color: "#777",
    fontSize: 14,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { userId } = useParams();
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
  });
  console.log(values);

  // const [user, setUser] = useState({});
  // console.log(user);

  const [redirectToSignin, setRedirectToSignin] = useState(false);

  const jwt = auth.isAuthenticated();
  console.log(jwt);

  const checkFollow = (user) => {
    const match = user?.followers?.some((follower) => {
      return follower?._id == jwt?.user._id;
    });
    return match;
  };

  // const clickFollowButton = (callApi) => {
  //   if (!values.user || !values.user._id) return;
  //   callApi(
  //     {
  //       userId: jwt.user._id,
  //     },
  //     {
  //       t: jwt.token,
  //     },
  //     values.user?._id,
  //   ).then((data) => {
  //     if (data.error) {
  //       setValues({ ...values, error: data.error });
  //     } else {
  //       setValues({ ...values, user: data, following: !values.following });
  //     }
  //   });
  // };

  const clickFollowButton = (callApi) => {
    if (!values.user || !values.user._id) return;

    callApi({ userId: jwt.user._id }, { t: jwt.token }, values.user._id).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues((prev) => ({
            ...prev,
            user: data,
            following: !prev.following,
          }));
        }
      },
    );
  };
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const jwt = auth.isAuthenticated();

    read({ userId: userId }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin({ ...values, redirectToSignin: true });
      } else {
        // setUser(data);
        let following = checkFollow(data);
        setValues({ ...values, user: data, following: following });
      }
    });

    return () => {
      abortController.abort();
    };
  }, [userId]);

  if (redirectToSignin) {
    return <Navigate to="/signin" />;
  }

  // const photoUrl = values.user?._id
  //   ? `${API}/api/users/photo/${values?._id}?${new Date().getTime()}`
  //   : `${API}/api/users/defaultphoto`;

  const photoUrl = values.user?._id
    ? `${API}/api/users/photo/${values.user._id}?${new Date().getTime()}`
    : `${API}/api/users/defaultphoto`;
  console.log(photoUrl);
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>

      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={photoUrl}>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={values.user?.name}
            secondary={values.user?.email}
          />
             {jwt?.user && jwt?.user?._id === values.user?._id ? (
          <ListItemSecondaryAction>
            <Link to={"/user/edit/" + values.user._id}>
              <IconButton aria-label="Edit" color="primary">
                <Edit />
              </IconButton>
            </Link>

            <DeleteUser userId={values.user._id} />
          </ListItemSecondaryAction>
        ) : (
          <FollowProfileButton
            following={values.following}
            onButtonClick={clickFollowButton}
          />
        )}
        
        </ListItem>
        <Divider />

        <ListItem>
          <ListItemText primary={values.user?.about} />
        </ListItem>

        <ListItem>
          <ListItemText
            primary={
              values.user?.created
                ? "Joined: " + new Date(values.user?.created).toDateString()
                : ""
            }
          />
        </ListItem>
      </List>
      <FollowGrid people={values?.user?.followers} />
      <FollowGrid people={values?.user?.following} />
    </Paper>
  );
};

export default Profile;
