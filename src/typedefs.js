const gql = require("graphql-tag");

module.exports = gql`
  enum Payments {
    NOT_PAID
    PAID
  }

  type Sport {
    title: String!
    teamCount: [Int]
    image: String
    coverImage: String
  }
  input newSportInput {
    title: String!
    teamCount: [Int]
    image: String
    coverImage: String
  }
  type Address {
    country: String!
    city: String!
    district: String
  }

  input addressInput {
    country: String!
    city: String!
    district: String
  }
  type From_To_Timestamps {
    fromTimeStamp: String
    toTimeStamp: String
  }
  input from_to_timestampsInput {
    fromTimeStamp: String
    toTimeStamp: String
  }
  input availableSlotsInput {
    address: addressInput!
    time: from_to_timestampsInput!
  }
  type GeoLocation {
    lat: String!
    lng: String!
  }
  input geoLocationInput {
    lat: String!
    lng: String!
  }
  type Complex {
    id: ID!
    id_fb: String!
    name: String!
    description: String
    address: Address!
    geo: GeoLocation!
    contactInfo: [String!]!
    id_owner: String!
    isMembersOnly: Boolean!
    additionalEntryFees: Float
    courts: [Court]
  }
  input newComplexInput {
    name: String!
    address: addressInput!
    geo: geoLocationInput!
    contactInfo: [String!]!
    id_owner: String!
    isMembersOnly: Boolean!
    additionalEntryFees: Float
    courts: [newCourtInput]
    description: String
  }
  input updateComplexInput {
    id_fb: String!
    name: String
    description: String
    address: addressInput
    contactInfo: String
    isMembersOnly: Boolean
    additionalEntryFees: Float
    courts: [newCourtInput]
    geo: geoLocationInput
  }
  type Court {
    id: ID!
    id_fb: String!
    id_cmplx: String!
    sport: [Sport]!
    number: String!
    address: Address!
    reservedTimes: [From_To_Timestamps]!
  }
  input newCourtInput {
    id_cmplx: String!
    sport: [newSportInput]!
    number: String!
    address: addressInput!
    reservedTimes: [from_to_timestampsInput]!
  }
  input updateCourtInput {
    id_cmplx: String
    sport: String
    number: String
    location: String
    address: addressInput
    reservedTimes: [from_to_timestampsInput]
  }
  type Booking {
    id: ID!
    id_fb: String!
    id_cmplx: String!
    id_court: String!
    uid: String!
    fromTimeStamp: String
    toTimeStamp: String
    paymentStatus: Payments!
    reservationTimeStamp: String!
    totalFee: Float!
    appliedDiscount: Float
    reservationLink: String!
  }
  input newBookingInput {
    id_cmplx: String!
    id_court: String!
    uid: String!
    paymentStatus: Payments!
    reservationTimeStamp: String!
    totalFee: Float!
    fromTimeStamp: String
    toTimeStamp: String
    reservationLink: String!
    appliedDiscount: Float
  }
  input updateBookingInput {
    id_fb: String!
    id_cmplx: String
    id_court: String
    fromTimeStamp: String
    toTimeStamp: String
    paymentStatus: Payments
    tempLocked: String
    totalFee: Float
    appliedDiscount: Float
    reservationLink: String
  }

  type User {
    id: ID!
    uid: String!
    firstname: String!
    lastname: String!
    email: String!
    address: Address!
    phone: String!
    secondaryPhone: String
    image: String
    walletValue: Float
    walletCurrency: String
    createdAt: String!
    officePhone: String
    managerOfficeAddress: Address
    complexIDs: [String]
  }
  input userInput {
    uid: String
    firstname: String
    lastname: String
    email: String
    address: addressInput
    phone: String
    secondaryPhone: String
    image: String
    walletValue: Float
    walletCurrency: String
    createdAt: String
  }
  input newUserInput {
    uid: String!
    firstname: String!
    lastname: String!
    email: String!
    address: addressInput!
    phone: String!
    secondaryPhone: String
    image: String
    walletValue: Float
    walletCurrency: String
    createdAt: String!
  }
  input userUIDInput {
    uid: String!
  }
  input updateUserInput {
    uid: String!
    firstname: String
    lastname: String
    phone: String
    email: String
    address: addressInput
    secondaryPhone: String
    image: String
    walletValue: Float
    walletCurrency: String
    officePhone: String
    managerOfficeAddress: addressInput
    complexIDs: [String]
  }

  type BusinessOwner {
    id: ID!
    user: User!
    officePhone: String!
    managerOfficeAddress: Address!
    complexIDs: [String]
  }

  input newBusinessOwnerInput {
    user: newUserInput!
    officePhone: String!
    managerOfficeAddress: addressInput!
    complexIDs: [String]
  }
  input updateBusinessOwnerInput {
    uid: String!
    officePhone: String
    managerOfficeAddress: addressInput
    complexIDs: [String]
  }
  input firebaseDocIDInput {
    id_fb: String!
  }

  type Query {
    getUserByUID(input: firebaseDocIDInput): User!
    getAvailableSlotsByTime(input: availableSlotsInput): [Court]!
    getBookedSlotsByCourt(input: firebaseDocIDInput): [From_To_Timestamps]
  }

  type Mutation {
    newUser(input: newUserInput): User!
    updateUser(input: updateUserInput): User!
    deleteUser(input: userUIDInput): Boolean
    newBusinessOwner(input: newBusinessOwnerInput): BusinessOwner!
    newCourt(input: newCourtInput): Court!
    updateCourt(input: updateCourtInput): Court!
    deleteCourt(input: firebaseDocIDInput): Boolean
    newComplex(input: newComplexInput): Complex!
    updateComplex(input: updateComplexInput): Complex!
    deleteComplex(input: firebaseDocIDInput): Boolean
    newBooking(input: newBookingInput): Booking!
    updateBooking(input: updateBookingInput): Booking
    deleteBooking(input: firebaseDocIDInput): Boolean
  }
  type Subscription {
    newBookingListener: String!
  }
`;
