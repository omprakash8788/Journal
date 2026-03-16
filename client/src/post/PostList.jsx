import PropTypes from "prop-types";
import React from "react";
import Post from "./Post";

const PostList = (props) => {
  return (
    <div>
      <div style={{ marginTop: "24px" }}>
        {props?.posts?.map((item, i) => {
          return <Post post={item} key={i} onRemove={props.removeUpdate} />;
        })}
      </div>
    </div>
  );
};

export default PostList;

PostList.propTypes = {
 posts: PropTypes.array.isRequired,
 removeUpdate: PropTypes.func.isRequired
}

