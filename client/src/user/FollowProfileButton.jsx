import React from "react";
import { follow, unfollow } from "./api-user";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const FollowProfileButton = (props) => {
  const followClick = () => {
    props.onButtonClick(follow);
  };
  const unfollowClick = () => {
    props.onButtonClick(unfollow);
  };
  return (
    <div>
      {props.following ? (
        <Button variant="contained" color="secondary" onClick={unfollowClick}>
          Unfollow
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={followClick}>
          Follow
        </Button>
      )}
    </div>
  );
};

export default FollowProfileButton;

FollowProfileButton.prototype={
    following:PropTypes.bool.isRequired,
    onButtonClick: PropTypes.func.isRequired
}
