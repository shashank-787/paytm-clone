const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://shashankbankar5:CQ985O2whRbcJyGL@cluster0.t222yoh.mongodb.net/Paytm')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const accountsSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require : true
    },
    balance : {
        type : Number,
        required : true
    }
   
})
const Account = mongoose.model('accounts', accountsSchema)
const User = mongoose.model('users', userSchema)
module.exports = {
    User,
    Account
}