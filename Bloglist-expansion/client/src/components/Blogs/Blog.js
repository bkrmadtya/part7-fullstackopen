import React from 'react';
import { connect } from 'react-redux';

import { likeBlog, deleteBlog } from '../../reducers/blogReducer';
import CommentForm from './CommentForm';

const Blog = props => {
  const { blog, likeBlog, deleteBlog, user } = props;

  const handleLikeBlog = e => {
    e.stopPropagation();

    likeBlog(blog);
  };

  const enableRemoveIfCreator = () => {
    if (blog.user.id === user.id) {
      return (
        <div>
          <button
            onClick={() => {
              const confirmDelete = window.confirm(
                `Remove blog ${blog.title} by ${blog.author}`
              );

              confirmDelete && deleteBlog(blog);
            }}
          >
            Remove
          </button>
        </div>
      );
    }
  };

  if (blog === undefined) {
    return null;
  }

  console.log(blog);

  return (
    <div className="blogPost">
      <h2>
        {blog.title} {blog.author}
      </h2>

      <div>
        <div>
          <a href={blog.url} target="_">
            {blog.url}
          </a>
        </div>
        <div>
          {blog.likes} likes
          <button onClick={e => handleLikeBlog(e)}>like</button>
        </div>
        <div>added by {blog.user.username}</div>
        {enableRemoveIfCreator()}

        <CommentForm blog={blog} />

        <ul>
          {blog.comments.map((comment, i) => (
            <li key={blog.id + comment + i}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { likeBlog, deleteBlog })(Blog);
