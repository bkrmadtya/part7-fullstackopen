import React from 'react';
import { connect } from 'react-redux';

import Blog from './Blog';

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.id + blog.title} blog={blog} />
      ))}
    </div>
  );
};

const sortedBlogs = ({ blogs }) => {
  return blogs.sort((item1, item2) => item2.likes - item1.likes);
};

const mapStateToProps = state => {
  return {
    blogs: sortedBlogs(state),
    user: state.user
  };
};

export default connect(mapStateToProps)(BlogList);
