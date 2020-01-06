import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Toggleable from './Toggleable';
import BlogForm from './BlogForm';

const Blogs = ({ blogs }) => {
  return (
    <div>
      <Toggleable buttonLabel="create new">
        <BlogForm />
      </Toggleable>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Blog</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {blogs.map(blog => (
            <Table.Row key={blog.id}>
              <Table.Cell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </Table.Cell>
              <Table.Cell>{blog.author}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
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
