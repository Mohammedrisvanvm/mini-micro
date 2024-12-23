import React, { useState } from "react";
import axios from "axios";
const Commentcreate = ({ postId }) => {
  const [content, setContent] = useState("");
  const onsubmit = async (event) => {
    try {
      event.preventDefault();
      if (content) {
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
          content,
        });
        setContent("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={onsubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          ></input>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Commentcreate;
