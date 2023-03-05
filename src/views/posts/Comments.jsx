import React, { useState } from 'react';
import Ellipse from './images/Ellipse.png'

const Comments = ({ comments, postId, currentUser, handleKeyPress }) => {
  return (
    <>
      {comments
        .filter(comment => comment.postId === postId)
        .map(comment => (
          <div key={comment.text} className="comment">
            <div className="comment-id-2">
              <img alt="" className="comment-img" src={Ellipse} />
              <div className="comment-id">
                <h6>{comment.name} </h6>
                <h6>@{comment.username}</h6>
              </div>
            </div>
            <p className="posts-comment">{comment.text}</p>
          </div>
        ))}
      {/* text area for comments */}
      <textarea
        className="comment-textarea"
        placeholder="Add Comment"
        onKeyPress={(e) => handleKeyPress(e, postId)}
      />
    </>
  );
};

export default Comments;
