import React from 'react';
import { connect } from 'react-redux';

import { useField } from '../../hooks/index';

import { createBlog } from '../../reducers/blogReducer';

const BlogForm = ({ createBlog }) => {
  const [title, titleReset] = useField('text');
  const [author, authorReset] = useField('text');
  const [url, urlReset] = useField('text');

  const handleSubmit = event => {
    event.preventDefault();

    createBlog({
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

export default connect(null, { createBlog })(BlogForm);
