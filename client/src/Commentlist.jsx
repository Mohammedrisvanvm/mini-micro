import React, { useEffect, useState } from "react";

const Commentlist = ({ comments }) => {
  const rendercomments = comments.map((comment) => {
    let content;
    
    if (comment.status === "approved") {
      content = comment.content;
    }
    if (comment.status === "pending") {
      content = "This comment awaiting for moderation";
    }
    if (comment.status === "rejected") {
      content = "This comment has been rejected";
    }
    return <li key={comment.id}>{content}</li>;
  });
  return <ul>{rendercomments}</ul>;
};

export default Commentlist;
