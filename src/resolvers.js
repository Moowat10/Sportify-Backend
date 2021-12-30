const firestore = require("./db");
/**
 * Anything Query / Mutation resolver
 * using a user for a DB query
 * requires user authenication
 */
const NEW_BOOKING = "NEW_BOOKING";

module.exports = {
  Query: {
    async getUserByUID(_, { input }) {
      const user = firestore.getDoc("users", input.uid);
      const data = user.data();
      data["uid"] = input.uid;
      return data;
    },
  },
  Mutation: {
    async newUser(_, { input }) {
      if (!input.secondaryPhone) input["secondaryPhone"] = "";
      if (!input.image) input["image"] = "";
      if (!input.walletValue) input["walletValue"] = 0;
      if (!input.walletCurrency) input["walletCurrency"] = "";
      const user = await firestore.create("users", input, input.uid);
      const address = input.address;
      input["country"] = address.country;
      input["city"] = address.city;
      input["district"] = address.district;
      delete input.address;
      return input;
    },
    async updateUser(_, { input }) {
      const uid = input.uid;
      delete input.uid;
      const updateUser = await firestore.update("users", uid, input);
      console.log(updateUser.id);
      const data = updateUser.data();
      data["uid"] = updateUser.id;
      return data;
    },
    async newComplex(_, { input }) {
      let temp = input;
      if (!input.additionalEntryFees) input["additionalEntryFees"] = 0;
      if (!input.courts) input["courts"] = "";
      if (!input.description) input["description"] = "";
      const complex = await firestore.create("complexes", input);
      return complex;
    },
    async newCourt(_, { input }) {
      let temp = input;
      const address = input.address;
      input["country"] = address.country;
      input["city"] = address.city;
      input["district"] = address.district;
      delete input.address;
      const court = await firestore.create("courts", input);
      return court;
    },
    async newBooking(_, { input }) {
      const booking = await firestore.create("bookings", input);
      console.log(booking);
      return booking;
    },
    async updateBooking(_, { input }, { pubsub }) {
      const id = input.id_fb;
      delete input.id_fb;
      pubsub.publish(NEW_BOOKING, {
        newBookingListener: () => {
          let today = new Date();
          let min = today.getMinutes();
          console.log("MINUTESSSSS", min);
          return input.paymentStatus;
        },
      });
      const updateBooking = await firestore.update("bookings", id, input);
      console.log(updateBooking);
      let data = updateBooking.data();
      data["id_fb"] = updateBooking.id;
      return data;
    },
  },
  Subscription: {
    newBookingListener: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_BOOKING),
    },
  },
};
