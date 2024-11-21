import React, { useEffect, useState } from "react";
import axios from "axios";
import Commentcreate from "./Commentcreate";
import Commentlist from "./Commentlist";
const Postlist = () => {
  const [posts, setPosts] = useState({});
  const fetchPost = async () => {
    try {
      const res = await axios.get("http://localhost:4002/posts");
      console.log(res.data);

      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(async () => {
    fetchPost();
  }, []);

  const renderPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          {" "}
          <h3>{post.title}</h3>
          <Commentlist comments={post.comments} />
          <Commentcreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPosts}
    </div>
  );
};

export default Postlist;
