import React, { useEffect, useState } from "react";
import { findPeople, follow } from "./api-user";
import auth from "../auth/auth-helper";
import { Link } from "react-router-dom";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Button,
  IconButton,
  Snackbar,
  useTheme,
} from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { makeStyles } from "@mui/styles";
import { Visibility } from "@mui/icons-material";

// import VisibilityIcon from "@mui/icons-material/Visibility";

const API = import.meta.env.VITE_API_URL;

// const useStyles = makeStyles((theme) => ({
//   root: theme?.mixins?.gutters({
//     padding: theme.spacing(1),
//     margin: 0,
//   }),
//   title: {
//     margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
//     color: theme.palette.openTitle,
//     fontSize: "1em",
//   },
//   avatar: {
//     marginRight: theme.spacing(1),
//   },
//   follow: {
//     right: theme.spacing(2),
//   },
//   snack: {
//     color: theme.palette.protectedTitle,
//   },
//   viewButton: {
//     verticalAlign: "middle",
//   },
// }));

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    root: theme?.mixins?.gutters
      ? theme.mixins.gutters({
          padding: theme.spacing(1),
          margin: 0,
        })
      : {
          padding: 8,
          margin: 0,
        },

    title: {
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(
        2,
      )}px`,
      color: theme?.palette?.openTitle || "#000",
      fontSize: "1em",
    },

    avatar: {
      marginRight: theme.spacing(1),
    },

    follow: {
      right: theme.spacing(2),
    },

    snack: {
      color: theme?.palette?.protectedTitle || "#333",
    },

    viewButton: {
      verticalAlign: "middle",
    },
  };
});

const FindPeople = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    users: [],
    open: false,
    followMessage: "",
  });

  const jwt = auth.isAuthenticated();

  // Follow User
  const clickFollow = (user, index) => {
    follow({ userId: jwt.user._id }, { t: jwt.token }, user._id).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          let toFollow = [...values.users];
          toFollow.splice(index, 1);

          setValues({
            ...values,
            users: toFollow,
            open: true,
            followMessage: `Following ${user.name}!`,
          });
        }
      },
    );
  };

  // Load users to follow
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    findPeople({ userId: jwt.user._id }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          setValues((prev) => ({
            ...prev,
            users: data,
          }));
        }
      },
    );

    return () => {
      abortController.abort();
    };
  }, []);

  const handleRequestClose = (event, reason) => {
    setValues({ ...values, open: false });
  };

  return (
    <div>
      <List>
        {values?.users?.map((item, i) => (
          <ListItem key={i}>
            <ListItemAvatar>
              <Avatar src={`${API}/api/users/photo/${item._id}`} />
            </ListItemAvatar>

            <ListItemText primary={item?.name} />

            <ListItemSecondaryAction>
              <Link to={"/user/" + item._id}>
                <IconButton color="secondary">
                  <Visibility />
                </IconButton>
              </Link>

              <Button
                variant="contained"
                color="primary"
                onClick={() => clickFollow(item, i)}
              >
                Follow
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={values.open}
        onClose={handleRequestClose}
        autoHideDuration={6000}
        message={<span className={classes.snack}>{values.followMessage}</span>}
      />
    </div>
  );
};

export default FindPeople;
