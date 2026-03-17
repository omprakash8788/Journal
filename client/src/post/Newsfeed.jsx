import { Card, Divider, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import PostList from "./PostList";
import { useEffect } from "react";
import { listNewsFeed } from "./api-post";
import auth from "../auth/auth-helper";
import NewPost from "./NewPost";
// import { NewPost } from "./NewPost";

const Newsfeed = () => {
  const [posts, setPosts] = useState([]);
  const addPost = (post) => {
    const updatedPosts = [...posts];
    updatedPosts.unshift(post);
    setPosts(updatedPosts);
  };

  const removePost = (post) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  const jwt = auth?.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listNewsFeed(
      {
        userId: jwt?.user?._id,
      },
      {
        t: jwt?.token,
      },
      signal,
    ).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <Card>
        <Typography type="title"> Newsfeed </Typography>
        <Divider />
        <NewPost addUpdate={addPost} />
        <Divider />
        <PostList removeUpdate={removePost} posts={posts} />
      </Card>
    </div>
  );
};

export default Newsfeed;
