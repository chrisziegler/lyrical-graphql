import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import query from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    this.props
      .mutate({
        variables: { id }
      })
      .then(() => this.props.data.refetch());
  }

  renderSongs() {
    const { songs, id } = this.props.data;
    // destructure song here
    return songs.map(({ id, title }) => (
      <li key={id} className="collection-item">
        <Link to={`/songs/${id}`}>{title}</Link>
        <i
          className="material-icons"
          style={{ fontSize: '1.5rem' }}
          onClick={() => this.onSongDelete(id)}
        >
          delete
        </i>
      </li>
    ));
  }

  render() {
    const { songs, loading } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h4>Song List</h4>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-medium red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

// Alternative syntax w/o compose
// export default graphql(mutation) (
//   graphql(query)(SongList)
// );

export default compose(graphql(mutation), graphql(query))(
  SongList
);
