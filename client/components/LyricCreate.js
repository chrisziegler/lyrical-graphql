import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
// import query from '../queries/fetchSong';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  handleChange(e) {
    this.setState({
      content: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { songId } = this.props,
      { content } = this.state;
    this.props.mutate({
      variables: {
        songId,
        content
      }
    });
    this.setState({ content: '' });
  }

  render() {
    const { content } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Add Lyric</label>
          <input
            type="text"
            className="input-back"
            value={content}
            onChange={e => this.handleChange(e)}
          />
          <button
            style={{
              backgroundColor: 'grey',
              color: 'white',
              border: '1px solid #414141',
              borderRadius: '3px'
            }}
          >
            <i
              className="material-icons"
              style={{
                marginRight: '3px',
                fontSize: '1.3rem',
                position: 'relative',
                top: '4px',
                color: 'white'
              }}
            >
              add_box
            </i>
            <span style={{ fontSize: '1rem' }}>
              Add Lyric
            </span>
          </button>
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($songId: ID!, $content: String) {
    addLyricToSong(songId: $songId, content: $content) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
