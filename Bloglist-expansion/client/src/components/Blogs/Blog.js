import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { List, Icon, Button, Segment } from 'semantic-ui-react';

import { likeBlog, deleteBlog } from '../../reducers/blogReducer';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

let Blog = props => {
  const { blog, likeBlog, deleteBlog, user } = props;

  const handleLikeBlog = e => {
    e.stopPropagation();

    likeBlog(blog);
  };

  const handleDeleteBlog = () => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );

    confirm && deleteBlog(blog);
    props.history.push('/');
  };

  const enableRemoveIfCreator = () => {
    if (blog.user.id === user.id) {
      return (
        <Button
          floated="right"
          size="tiny"
          color="red"
          onClick={handleDeleteBlog}
        >
          <Icon name="trash alternate outline" /> Delete
        </Button>
      );
    }
  };

  if (blog === undefined) {
    return null;
  }

  return (
    <div className="blogPost">
      <div>
        <Segment>
          <List>
            <List.Item>
              <List.Header>Title</List.Header>
              <List.Description>{blog.title}</List.Description>
            </List.Item>
            <List.Item>
              <List.Header>Author</List.Header>
              <List.Description>{blog.author}</List.Description>
            </List.Item>
            <List.Item>
              <List.Header>Link</List.Header>
              <List.Description>
                <a href="#" target="_">
                  {blog.url}
                </a>
              </List.Description>
            </List.Item>
            <List.Item>
              <List.Header>
                <em>Added by</em>
              </List.Header>
              <List.Description>{blog.user.name}</List.Description>
            </List.Item>
          </List>

          <Button
            size="mini"
            onClick={handleLikeBlog}
            color="red"
            content="Like"
            icon="heart"
            label={{
              basic: true,
              color: 'red',
              pointing: 'left',
              content: `${blog.likes}`
            }}
          />
          {enableRemoveIfCreator()}
        </Segment>

        <CommentForm blog={blog} />

        <CommentList comments={blog.comments} />
      </div>
    </div>
  );
};

Blog = withRouter(Blog);

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { likeBlog, deleteBlog })(Blog);
