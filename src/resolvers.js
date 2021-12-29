const firestore = require("./db");

/**
 * Anything Query / Mutation resolver
 * using a user for a DB query
 * requires user authenication
 */
module.exports = {
  Query: {},
  Mutation: {
    async newUser(_, { input }) {
      //Creating new user in Mongo
      input["secondaryPhone"] = "";
      input["image"] = "";
      input["walletValue"] = 0;
      input["walletCurrency"] = "";
      const user = await firestore.create("users", input, input.uid);
      console.log(input);
      return input;
    },
    async updateUser(_, { input }) {
      const uid = input.uid;
      delete input.uid;
      const updateUser = await firestore.update("users", uid, input);
      console.log(updateUser);
    },
  },
  Subscription: {},
};
