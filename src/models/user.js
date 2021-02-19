const chalk = require('chalk');
const validator = require('validator');
const p = console.log;
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error(chalk.red.inverse("C'mon,bruh...with the age."));
            }
        }
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(chalk.yellow.inverse("Email is invalid"))
            }
        }
    },
    passkey:{
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value){
            if(value.includes("password")){
                throw new Error(chalk.red.bold("Don't be generic."))
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
});
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() },"japan");

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}
userSchema.statics.findByCredentials = async (email,passkey)=>{
    const user = await User.findOne({email});

    if(!user){
        throw new Error("Unable to find user");
    }
    const isMatch = await bcrypt.compare(passkey,user.passkey);
    if(!isMatch){
        throw new Error("Unable to log in");
    }

    return user;

}

// Hash the plain text passkey before saving
userSchema.pre('save',async function(next){
    
    if(this.isModified("passkey")){
        this.passkey = await bcrypt.hash(this.passkey,8);
    }
    next();
})
const User = mongoose.model('User', userSchema );

module.exports = User;