import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;
    if (!song) {
      return <div />;
    }
    return (
      <div>
        <Link
          to="/"
          className="btn-floating btn-sm blue"
          style={{ marginTop: 10 }}
        >
          <i className="material-icons">chevron_left</i>{' '}
        </Link>
        <h4>{song.title}</h4>
        <div>
          <LyricCreate songId={this.props.match.params.id} />
        </div>
        <LyricList
          lyrics={song.lyrics}
          songId={this.props.match.params.id}
        />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: props => {
    return { variables: { id: props.match.params.id } };
  }
})(SongDetail);
