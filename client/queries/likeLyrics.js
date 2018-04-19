import gql from 'graphql-tag';

export default gql`
  query Likes($id: ID!) {
    lyric(id: $id) {
      id
      likes
    }
  }
`;
