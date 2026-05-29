/// Post.jsx

import React from "react";

/*
  React.memo:
  Stops re-render if props stay same
*/

const Post = React.memo(({ info }) => {
  console.log("🟣 Post Component Rendered");

  return (
    <div>
      <h2>React.memo Child</h2>

      <h3>
        Hi my name is {info.name} and age is {info.age}
      </h3>
    </div>
  );
});

export default Post;