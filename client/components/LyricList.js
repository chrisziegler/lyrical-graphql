import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }

  renderLyrics() {
    const { lyrics } = this.props;
    // console.log('lyriclist', this.props);
    return lyrics.map(({ id, content, likes }) => (
      <li key={id} className="collection-item">
        {content}
        <div className="vote-box">
          <i
            className="material-icons"
            style={{ fontSize: '1.2rem', color: '#2196F3' }}
            onClick={() => this.onLike(id, likes)}
          >
            thumb_up
          </i>
          {likes}
        </div>
      </li>
    ));
  }

  render() {
    return (
      <ul className="collection">{this.renderLyrics()}</ul>
    );
  }
}
const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
