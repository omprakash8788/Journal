import React, { useState } from "react";
import auth from "../auth/auth-helper";
import { remove } from "./api-user";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteUser = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const deleteAccount = () => {
    const jwt = auth.isAuthenticated();
    remove(
      { userId: userId },
      { t: jwt.token }
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        auth.clearJWT(() => console.log("deleted"));
        setRedirect(true);
      }
    });
  };

  const clickButton = () => {
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <span>
      <IconButton aria-label="delete" onClick={clickButton} color="error">
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete Account</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Confirm to delete your account.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleRequestClose}>
            Cancel
          </Button>

          <Button
            onClick={deleteAccount}
            color="error"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
};

export default DeleteUser;