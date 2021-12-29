const mongoose = require('mongoose')

const user = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: String,
    gender: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    DOB: String,
    nationality: String,
    phone: String,
    address: {
        country: String,
        city: String,
        street: String,
        zipCode: String,
    },
    geoLocation: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'geolocation'
    },
    favCategories: [ {type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'categorie'} ],
    socialToken: {
        posting: Boolean,
        sharing: Boolean,
        commenting: Boolean
    },
    status: {
        isActive: Boolean,
        lastSeen: String
    },
    followersList: [ {type: String} ],
    followingList: [ {type: String} ],
    completeReg: {
        type: Boolean,
        required: true
    },
    role: {
        type: String,
        required: true
    }

} , {timestamps: true})

const employee = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    empType: {
        type: String,
        required: true
    },
    permissions: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'permission'
    },
    nationalID: {
        type: String,
        required: true
    },
    storesIDList: [ {type: String} ],
    businessId: String,
    businessPhone: String

} , {timestamps: true})

const store = mongoose.Schema({
     ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    name: {
        type: String,
        required: true,
    },
    verefied: {
        type: Boolean,
        required: false
    },
    employeesId: [ { type: String } ],
    bio: String,
    district: { type: String,
        	   required: true },
    geoLocation: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'geolocation'
    },
    workingHours: String,
    holidays: [{type: String}],
    fax: [{type: String}],
    landLines: [{type: String}],
    mobiles: [{type: String}],
    emails: [{type: String}],
    ratingsId: [{type: String}],
    isDelivering: Boolean,
    paymentType: String,
    deliveryRange: Number,
    photosUrls: [{type: String}],
    videosUrls: [{type: String}],
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'categorie'
    },
    servicesId: [ {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'service'
    } ],
    promotions: [ { serviceId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'service'
                    },
                    discount: {
                        type: Number,
                        required: true
                    } } ],
    analyticsId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'analytic'
    },
    generalPolicy: {
        type: String,
        required: true
    }

} , {timestamps: true})

const permission = mongoose.Schema({
    accessOrders: Boolean,
    acceptOrders: Boolean,
    chatWithClients: Boolean,
    modifyStoreInfo: Boolean,
    servicesManagement: Boolean,
    socialMediaManagement: Boolean,
    analyticsAndPerformance: Boolean
})

const rating = mongoose.Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'store'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    stars: { type: Number,
            required: true},
    comment: String,
} , {timestamps: true})

const User = mongoose.model('user', user)
const Store = mongoose.model('store', store)
const connect = () => {
   return mongoose.connect('mongodb+srv://OmarTarekHarbMaster:4010063@basecluster.xuh3b.mongodb.net/serv-u?retryWrites=true&w=majority')
}

module.exports = {
        User: User,
        Store: Store,
        connect: connect
}