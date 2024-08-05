import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [1, "Last Name Must Contain At Least 1 Characters!"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please Provide A Valid Email!"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
  },
nic:{
    type:Number,
    minLength: [10, "NIC Must Contain Exact 10 Digits!"],
    maxLength: [10, "NIC Must Contain Exact 10 Digits!"],
},
dob:{
    type:Date,
    required:[true,"DOB is required!"]
},
gender:{
    type:String,
    enum:["Male","Female"]
},
password:{
    type:String,
    required:true,
    select:false,
    minLength:[8,"Password Must Contain Atleast 8 Characters!"]
},
role:{
    type:String,
    required:true,
    enum:["Admin","Patient","Doctor"]
},
doctorDepartment:{
    type:String,
},
docAvatar:{
    public_id:String,
    url:String
}

});

userSchema.pre("save",async(next)=>{
if(this.isModified("password")){
    next();
}
this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword = async(enteredPassword)=>{
    return await bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES
    });
};

const UserModel = mongoose.model("User", userSchema);
export default MessageModel;