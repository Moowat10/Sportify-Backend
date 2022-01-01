const firestore = require("./db");
const schedule = require("node-schedule");
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
    async deleteUser(_, { input }) {
      const deletedUser = await firestore.delete("users", input.id_fb);
    },
    async newBusinessOwner(_, { input }) {
      if (!input.user.secondaryPhone) input.user["secondaryPhone"] = "";
      if (!input.user.image) input.user["image"] = "";
      if (!input.user.walletValue) input.user["walletValue"] = 0;
      if (!input.user.walletCurrency) input.user["walletCurrency"] = "";
      input.user["officePhone"] = input.officePhone;
      input.user["managerOfficeAddress"] = input.managerOfficeAddress;
      input.user["complexIDs"] = input.complexIDs;
      console.log(input.user);
      const user = await firestore.create("users", input.user, input.user.uid);
      return input;
    },
    async newComplex(_, { input }) {
      let temp = input;
      if (!input.additionalEntryFees) input["additionalEntryFees"] = 0;
      if (!input.courts) input["courts"] = "";
      if (!input.description) input["description"] = "";
      const complex = await firestore.create("complexes", input);
      return complex;
    },
    async updateComplex(_, { input }) {
      const id_fb = input.id_fb;
      delete input.id_fb;
      const updateComplex = await firestore.update("complexes", id_fb, input);
      const data = updateComplex.data();
      data["id_fb"] = updateComplex.id;
      return data;
    },
    async deleteComplex(_, { input }) {
      const deletedComplex = await firestore.delete("complexes", input.id_fb);
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
    async updateCourt(_, { input }) {
      const id_fb = input.id_fb;
      delete input.id_fb;
      const updateCourt = await firestore.update("courts", id_fb, input);
      const data = updateCourt.data();
      data["id_fb"] = updateCourt.id;
      return data;
    },
    async deleteCourt(_, { input }) {
      const deletedCourt = await firestore.delete("courts", input.id_fb);
    },
    async newBooking(_, { input }) {
      const booking = await firestore.create("bookings", input);
      const job = schedule.scheduleJob(
        booking.id_fb,
        "*/5 * * * *",
        async function () {
          const min = new Date().getMinutes();
          const doc = await firestore.getDoc("bookings", booking.id_fb);

          if (doc.data().paymentStatus === "NOT_PAID") {
            await firestore.delete("bookings", booking.id_fb);
          }

          schedule.cancelJob(booking.id_fb);
        }
      );
      return booking;
    },
    async updateBooking(_, { input }, { pubsub }) {
      const id = input.id_fb;
      delete input.id_fb;
      pubsub.publish(NEW_BOOKING, {
        newBookingListener: () => {
          if (input.paymentStatus === "PAID") schedule.cancelJob(id);
          return id + " " + input.paymentStatus;
        },
      });
      const updateBooking = await firestore.update("bookings", id, input);
      let data = updateBooking.data();
      data["id_fb"] = updateBooking.id;
      return data;
    },
    async deleteBooking(_, { input }) {
      const deletedBooking = await firestore.delete("bookings", input.id_fb);
    },
  },
  Subscription: {
    newBookingListener: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_BOOKING),
    },
  },
};
