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

const getPosts = () => {
  client.query({ query, forceFetch: true }).then(({ data }) => {
    document.getElementById('result').innerHTML = JSON.stringify(data.posts, null, 2);
  });
};

getPosts();


const mutation = gql`mutation {
  addPost(name: "foo name", title: "foo title", content: "foo content") {
    name
    title
    content
  }
}`;

client.mutate({ mutation }).then(getPosts);
