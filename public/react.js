/* global apolloClient, graphqlTag, reactApollo, React, ReactDOM */
/* eslint-env browser */

const ApolloClient = apolloClient.default;
const gql = graphqlTag.default;
const ApolloProvider = reactApollo.ApolloProvider;

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

const App = () => (
  <div>
    <h1>Welcome</h1>
  </div>
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
);

