/* global apolloClient, graphqlTag */
/* eslint-env browser */

const ApolloClient = apolloClient.default;
const createNetworkInterface = apolloClient.createNetworkInterface;
const gql = graphqlTag.default;

const networkInterface = createNetworkInterface('/graphql');
const client = new ApolloClient({
  networkInterface,
});

const query = gql`{
  posts {
    name
    title
    content
  }
}`;

client.query({ query }).then(({ data }) => {
  document.getElementById('result').innerHTML = JSON.stringify(data.posts, null, 2);
});
