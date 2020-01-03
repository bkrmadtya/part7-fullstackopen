import React from 'react';

const BlogForm = ({ handleCreateBlog, title, author, url }) => {
  return (
    <form onSubmit={handleCreateBlog}>
      <h2>Create new blog</h2>
      <div>
        title:
        <input {...title} required />
      </div>
      <div>
        author:
        <input {...author} required />
      </div>
      <div>
        url:
        <input {...url} required />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
