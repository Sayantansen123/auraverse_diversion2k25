import mongoose from "mongoose";

//user Model to store user data and let them login or create 
const userSchema = mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
        minlength:6,
    },
    points:{
        type: Number,
        default: 0
    },
    rank: {
        type: String,
        enum:['Newbie', 'Hobby', 'Job', 'Experienced', 'Senior', 'Grandmaster', 'GOAT'],
        default: 'Newbie'
    },
    walletaddress:{
        type: String,
        unique: true,
        default: "",
    }
},{timestamps:true});

const User = mongoose.model("User",userSchema)

export default User;