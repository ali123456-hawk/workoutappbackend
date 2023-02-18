const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
var validator = require('validator');


const userSchema = new Schema({
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
}
})

userSchema.statics.signup = async function(email,password) {

    if(!email || !password){
        throw Error("All fields must be filled")
    }
  
    const exist = await this.findOne({email});
    if(exist){
        throw Error("email already in use");
    }

    
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough")
    }

   
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    
    const user = await this.create({email,password:hash})

    return user

}

userSchema.statics.login = async function(email,password) {
    if(!email || !password){
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({email});
    if(!user){
        throw Error("ENTER VALID EMAIL");
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error("WRONG PASSWORD")
    }

    return user

}


module.exports = mongoose.model('User',userSchema)