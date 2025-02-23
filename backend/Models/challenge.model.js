import mongoose from "mongoose"
const challengeSchema=mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    points:{
        type: Number,
        required: true
    },
},{timestamps:true})

const Challenge = mongoose.model("Challenge",challengeSchema)

export default Challenge;