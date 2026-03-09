import React, { useEffect, useState } from "react";
import { list } from "./api-user";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";

import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";


const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <Paper sx={{ maxWidth: 600, margin: "auto", mt: 4 }} elevation={4}>
      <Typography variant="h6" sx={{ p: 2 }}>
        All Users
      </Typography>

      <List dense>
        {users?.map((item) => (
          <ListItem
            key={item._id}
            component={Link}
            to={`/user/${item._id}`}
            secondaryAction={
              <IconButton edge="end">
                <ArrowForward />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>

            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Users;
