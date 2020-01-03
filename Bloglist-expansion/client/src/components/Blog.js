import React, { useState } from 'react';

const Blog = ({ blog, updateBlog, deleteBlog, blogCreator }) => {
  const [showDetails, setShowDetails] = useState(false);

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

  const likeBlog = e => {
    e.stopPropagation();
    blog.likes++;

    updateBlog(blog);
  };

  const enableRemoveIfCreator = () => {
    let result = null;

    if (blogCreator) {
      result = (
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
    return result;
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
            <button onClick={e => likeBlog(e)}>like</button>
          </div>
          <div>added by {blog.user.username}</div>
          {enableRemoveIfCreator()}
        </div>
      )}
    </div>
  );
};

export default Blog;
