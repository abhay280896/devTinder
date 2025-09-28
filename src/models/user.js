const { default: mongoose, Schema, model } = require("mongoose");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    cityName: {
        type: String,
        required: true
    },
    cityCode: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        select: false // to hide fileds from the response
    },
    password: {
        type: String,
        required: true,
        select: false // to hide fileds from the response
    }
},{ timestamps: true })

exports.User = model('User', userSchema)

// const User = mongoose.model("User", userSchema);

// module.exports = { User };