const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const validator = require('validator')
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


// static signup method
userSchema.statics.signup = async function(email, password) {

    // validation
    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    const exists = await this.findOne({ email })

    if(exists) {
        throw Error('Email already in use')
    }

    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Please enter a strong password")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })
    
    return user
}

// static login method
userSchema.statics.login = async function (email, password){ 
    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
        }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error ('User does not exist')
        }
        
    const correctPw = await bcrypt.compare(password, user.password)

    if (!correctPw) {
        throw Error ('Wrong Password')
        }

    return user
}

module.exports = mongoose.model('User', userSchema)