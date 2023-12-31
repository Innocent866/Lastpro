const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new Schema({
    firstname:{
        type:String,
        require:true,
        trim:true
    },
    lastname:{
        type:String,
        require:true,
        trim:true
    },
     email:{
        type:String,
        require:[true,"please enter an email address"],
        unique:[true,"Email already in use"],
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
     },
     phonenumber:{
        type:String,
        require:[true,"Please enter a phone number"],
        trim:true,
        minlength:[10,"Minimum length must be 10"]
    },
    password:{
        type:String,
        require:[true,"Please enter a valid password"],
        trim:true,
        minlength:[8,"Minimum password length must 8 character"],
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error('password must not contain password')
            }
        }
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
},{timestamps:true})

// hashing password
userSchema.pre("save",async function(next){
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

// password comparison
userSchema.methods.comparePassword = async function(userPassword){
    const isCorrect = await bcrypt.compare(userPassword, this.password);
    return isCorrect
}

// generate token
userSchema.methods.generateToken = async function () {
    let token = jwt.sign({userId:this._id},process.env.JWT_SECRETE);
    return token
}

// generating token
userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken = crypto.createHash("sha256").
    update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    return resetToken
}

// export
const USER = mongoose.model('user',userSchema)

module.exports = USER