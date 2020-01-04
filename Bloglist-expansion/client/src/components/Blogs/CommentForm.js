import React from 'react';
import { connect } from 'react-redux';

import { commentOnBlog } from '../../reducers/blogReducer';

const CommentForm = props => {
  const { commentOnBlog, blog } = props;

  const handleCreateComment = e => {
    e.preventDefault();

    const content = e.target.comment.value;

    const commentedBlog = {
      ...blog,
      user: blog.user.id,
      comments: [...blog.comments, content]
    };
    commentOnBlog(commentedBlog);
    e.target.comment.value = '';
  };

  return (
    <div>
      <h2>comments</h2>
      <form onSubmit={handleCreateComment}>
        <input name="comment" />
        <button type="submit">comment</button>
      </form>
    </div>
  );
};

export default connect(null, { commentOnBlog })(CommentForm);
