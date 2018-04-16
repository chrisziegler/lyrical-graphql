import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    };
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleOnSubmit(event) {
    //onSubmit is passed an event by default
    event.preventDefault();
    this.props
      .mutate({
        variables: { title: this.state.title },
        refetchQueries: [{ query }]
      })
      .then(() => this.props.history.push('/'));
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <Link
          to="/"
          className="btn-floating btn-sm blue"
          style={{ marginTop: 10 }}
        >
          <i className="material-icons">chevron_left</i>{' '}
        </Link>
        <h4>Create a Song</h4>
        <form onSubmit={this.handleOnSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            type="text"
            placeholder="name your song"
            style={{
              backgroundColor: '#F4F6F6',
              paddingLeft: '5px'
            }}
            value={title}
            onChange={event => this.handleChange(event)}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
