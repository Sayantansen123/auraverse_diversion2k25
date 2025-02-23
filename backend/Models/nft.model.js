import mongoose from "mongoose"
const NftSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    pointsrequired:{
        type: Number,
        required: true
    },
    contractAddress:{
        type: String,
        required: true
    },
    tokenId:{
        type: String,
        required: true
    },
    usersRedeemed:[{
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        },
        walletAddress:{
            type: String,
            required: true
        },
        redemptionDate:{
            type: Date,
            default: Date.now
        },
        status:{
            type: String, 
            enum:['pending', 'completed', 'failed'],
            default: 'pending'
        },
        transactionHash:{
            type:String
        }
    }]
},{timestamps:true})

const Nft = mongoose.model("Nft",NftSchema)

export default Nft;