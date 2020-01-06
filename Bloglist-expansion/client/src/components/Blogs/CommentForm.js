import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';

import { commentOnBlog } from '../../reducers/blogReducer';

const CommentForm = props => {
  const [comment, setComment] = useState('');

  const { commentOnBlog, blog } = props;

  const handleCreateComment = e => {
    e.preventDefault();

    const commentedBlog = {
      ...blog,
      user: blog.user.id,
      comments: [...blog.comments, comment]
    };
    commentOnBlog(commentedBlog);
    setComment('');
  };

  return (
    <div>
      <h4>Add a new comment</h4>

      <Form reply>
        <Form.TextArea
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <Button
          onClick={handleCreateComment}
          size="tiny"
          content="Add Comment"
          labelPosition="left"
          icon="edit"
          primary
          disabled={comment.trim().length > 0 ? false : true}
        />
      </Form>
    </div>
  );
};

export default connect(null, { commentOnBlog })(CommentForm);
