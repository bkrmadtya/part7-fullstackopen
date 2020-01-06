import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Segment } from 'semantic-ui-react';

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
    <Segment>
      <h4>Add a new blog</h4>
      <Form size="mini" onSubmit={handleSubmit}>
        <Form.Field required>
          <label>Title</label>
          <input id="title_input" {...title} />
        </Form.Field>
        <Form.Field required>
          <label>Author</label>
          <input id="author_input" {...author} />
        </Form.Field>
        <Form.Field required>
          <label>Url</label>
          <input id="url_input" {...url} />
        </Form.Field>
        <Button id="create_blog_btn" size="mini" type="submit" positive>
          Create
        </Button>
      </Form>
    </Segment>
  );
};

export default connect(null, { createBlog })(BlogForm);
