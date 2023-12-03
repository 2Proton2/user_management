const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {logger} = require('../config/logger_service/logger.config');
const private_key = process.env.PRIVATE_KEY;
const jwt = require('jsonwebtoken');

const usrSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique:  [true, "%%% Email ID already exist. Please, enter an unique email id %%%"]
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String
    },
    tokens : [
        {
            token: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ]
},
{
    timestamps: true
})

usrSchema.methods.generateAuthToken = async function() {
    try {
        let genToken = await jwt.sign({ id: this._id, exp: Date.now() + 2592000000 }, private_key);
        this.tokens = this.tokens.concat({token: genToken});
        await this.save();
        logger.info(`Token Generated Successfully`)
        console.log(genToken);
        return genToken;
    } catch (error) {
        console.log(`Error in generating token : ${error}`);
    }
}

usrSchema.pre('save', async function (next) {
    try {
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password,12);
            console.log(`Password hashed successfully`);
        }
        next();
    } catch (error) {
        logger.error(`Error in hashing the password : ${error}`);
    }
})

const userSchema = mongoose.model('user', usrSchema); 
module.exports = userSchema;