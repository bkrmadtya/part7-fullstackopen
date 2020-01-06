import React from 'react';
import { Segment, List } from 'semantic-ui-react';

const User = ({ user }) => {
  if (user === undefined) {
    return null;
  }

  return (
    <Segment>
      <h3>{user.name}</h3>
      <h3>Added blogs</h3>

      <List as="ol">
        {user.blogs.map(blog => (
          <List.Item as="li" key={blog.id}>
            {blog.title}
          </List.Item>
        ))}
      </List>
    </Segment>
  );
};

export default User;
