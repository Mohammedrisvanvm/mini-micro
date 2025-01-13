import React, { useState } from "react";
import axios from "axios";
const PostCreate = () => {
  const [title, setTitle] = useState("");
  const onsubmit = async (event) => {
    try {
        event.preventDefault();
        if (title){
            await axios.post("http://posts.com/posts/create", {
                title,
            });
            setTitle("");
        }
     
        
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={onsubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          ></input>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
