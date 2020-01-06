import React from 'react';
import {
  Comment,
  Divider,
  Header,
  Icon,
  Segment,
  Transition
} from 'semantic-ui-react';

const CommentList = ({ comments }) => {
  return (
    <Segment>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="comments outline" />
          Comments
        </Header>
      </Divider>

      {comments.length ? (
        <Transition.Group
          as={Comment}
          duration={200}
          divided
          size="huge"
          verticalAlign="middle"
        >
          {comments.map((comment, i) => (
            <Comment style={{ marginBottom: '5px' }} key={comment + i}>
              <Comment.Avatar>
                <Icon name="user outline" />
              </Comment.Avatar>
              <Comment.Content>
                <Comment.Author as="a">Anonymous</Comment.Author>
                <Comment.Text>{comment}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Transition.Group>
      ) : (
        'No comment yet'
      )}
    </Segment>
  );
};

export default CommentList;
