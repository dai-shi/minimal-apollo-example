const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const apolloExpress = require('apollo-server').apolloExpress;
const graphiqlExpress = require('apollo-server').graphiqlExpress;
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const postsData = [
  { name: 'Teru', title: '初めてのGraphQL', content: '勉強中aab' },
  { name: 'Dais', title: '初めてのApollo', content: '勉強中aac' },
];

const typeDefs = [`
  type Post {
    name: String
    title: String
    content: String
  }
  type Query {
    posts(keyword: String): [Post]
  }
  schema {
    query: Query
  }
  `];

const resolvers = {
  Query: {
    posts(root, args) {
      return postsData.filter(post =>
        !args.keyword || post.content.indexOf(args.keyword) >= 0);
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use('/graphql', bodyParser.json(), apolloExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3000);
