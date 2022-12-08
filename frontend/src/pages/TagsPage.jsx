import React, { useState } from "react";
import { useSelector } from "react-redux";
import Post from "../components/Post";
import Tags from "../components/tagsPage/Tags";

function TagsPage() {
  const { searchTag } = useSelector((state) => state.searchTag);
  const { posts } = useSelector((state) => state.posts);

  return (
    <div className="pageContainer">
      <h1 className="pageTitle">Tags</h1>

      <Tags />

      {/* Posts */}
      <div className="p-5 flex-[6] grid grid-cols-1 gap-5">
        {posts
          ?.filter((value) => {
            if (searchTag === "") {
              return value;
            } else if (value.categories.includes(searchTag)) {
              return value;
            } else {
              return null;
            }
          })
          .map((post) => (
            <Post key={post._id} postId={post._id} />
          ))}
      </div>
    </div>
  );
}

export default TagsPage;
