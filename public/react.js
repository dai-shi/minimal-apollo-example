/* global apolloClient, graphqlTag, reactApollo, React, ReactDOM */
/* eslint-env browser */

const ApolloClient = apolloClient.default;
const gql = graphqlTag.default;
const ApolloProvider = reactApollo.ApolloProvider;
const graphql = reactApollo.graphql;

const client = new ApolloClient();

const query = gql`query {
  posts {
    name
    title
    content
  }
}`;

const mutation = gql`mutation {
  addPost(name: "Mary", title: "Learn JS", content: "it is fun!") {
    name
    title
    content
  }
}`;

const App = ({ data }) => (
  <div>
    <h1>Welcome</h1>
    {data.loading ? <div>Loading...</div> :
      <ul>
        {data.posts.map(({ name, title, content }) => (
          <li>{name} - {title} - {content}</li>
        ))}
      </ul>
    }
  </div>
);

App.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool.isRequired,
    posts: React.PropTypes.array,
  }).isRequired,
};

const AppWithData = graphql(query)(App);

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppWithData />
  </ApolloProvider>,
  document.getElementById('app')
);

