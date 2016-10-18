/* global apolloClient, graphqlTag */
/* eslint-env browser */

const ApolloClient = apolloClient.default;
const gql = graphqlTag.default;

const client = new ApolloClient();

const query = gql`query {
  posts {
    name
    title
    content
  }
}`;

const showResult = (posts) => {
  document.getElementById('result').innerHTML = JSON.stringify(posts, null, 2);
};

const observableQuery = client.watchQuery({ query, pollInterval: 1000 });
observableQuery.subscribe({ next: ({ data }) => showResult(data.posts) });

const mutation = gql`mutation ($content: String){
  addPost(name: "Mary", title: "No title", content: $content) {
    name
    title
    content
  }
}`;

document.getElementById('add').addEventListener('click', () => {
  const content = document.getElementById('content').value;
  client.mutate({ mutation, variables: { content } });
});
