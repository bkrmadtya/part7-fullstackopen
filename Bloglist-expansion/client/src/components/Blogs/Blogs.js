import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Toggleable from './Toggleable';
import BlogForm from './BlogForm';

const Blogs = ({ blogs }) => {
  const style = {
    border: '1px solid black',
    borderRadius: 5,
    // backgroundColor: '#ccc',
    padding: 10,
    marginTop: 5
  };

  return (
    <div>
      <Toggleable buttonLabel="create new">
        <BlogForm />
      </Toggleable>

      {blogs.map(blog => (
        <div key={blog.id} style={style}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
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

export default connect(mapStateToProps)(Blogs);
