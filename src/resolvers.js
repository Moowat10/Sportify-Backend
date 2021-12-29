const { authenticated, authorized } = require("./auth");

/**
 * Anything Query / Mutation resolver
 * using a user for a DB query
 * requires user authenication
 */
module.exports = {
  Query: {},
  Mutation: {},
  Person: {
    __resolveType(person) {
      if (person.empType) return "Employee";
      else return "User";
    },
  },
};
