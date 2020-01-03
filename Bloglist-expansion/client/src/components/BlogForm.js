import React from 'react';
import { useField } from '../hooks/index';

const BlogForm = ({ handleCreateBlog }) => {
  const [title, titleReset] = useField('text');
  const [author, authorReset] = useField('text');
  const [url, urlReset] = useField('text');

  const handleSubmit = event => {
    event.preventDefault();
    handleCreateBlog({
      title: title.value,
      author: author.value,
      url: url.value
    });
    titleReset();
    authorReset();
    urlReset();
  };

  return (
    <form onSubmit={handleSubmit}>
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
