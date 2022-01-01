const { ApolloServer } = require("apollo-server-cloud-functions");
const { PubSub } = require("apollo-server");
const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");
const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    headers: req.headers,
    req,
    res,
    pubsub,
  }),
});

exports.handler = server.createHandler();
