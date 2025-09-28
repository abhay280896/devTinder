const mongoose = require('mongoose')

const URL = `mongodb+srv://abhay28:abhay123@cluster0.q4gwtng.mongodb.net/devTinder`

exports.connectDB = async () => {
    await mongoose.connect(URL)
};