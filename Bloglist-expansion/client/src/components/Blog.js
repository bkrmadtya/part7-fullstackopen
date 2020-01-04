import React, { useState } from 'react';
import { connect } from 'react-redux';

import { likeBlog, deleteBlog } from '../reducers/blogReducer';

const Blog = props => {
  const [showDetails, setShowDetails] = useState(false);
  const { blog, likeBlog, deleteBlog, user } = props;

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const blogStyle = {
    border: '1px solid black',
    borderRadius: 5,
    // backgroundColor: '#ccc',
    padding: 10,
    marginTop: 5
  };

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

  return (
    <div className="blogPost" style={blogStyle} onClick={toggleDetails}>
      <div>
        {blog.title} {blog.author}
      </div>
      {showDetails && (
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
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { likeBlog, deleteBlog })(Blog);
