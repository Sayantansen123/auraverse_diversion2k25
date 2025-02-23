import mongoose from "mongoose"

//user post model
const postSchema=mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User', 
        required: true
    },
    description: {
        type: String, 
        
    },
    imageUrl:{
        type: String,
    },
    imageHash:{
        type : String,
        unique: true,
    },
    pointsAwarded:{
        type: Number,
        default: 0
    }
})

const Post=mongoose.model("Post",postSchema)
export default Post;