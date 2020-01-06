import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

let UserList = ({ users }) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>User</Table.HeaderCell>
          <Table.HeaderCell>No of blogs created</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {users.map(user => (
          <Table.Row key={user.id}>
            <Table.Cell>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </Table.Cell>
            <Table.Cell>{user.blogs.length}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(mapStateToProps)(UserList);
