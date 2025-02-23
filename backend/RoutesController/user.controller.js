import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs"
import jwtToken from "../Utils/jsonweb.js";


export const userRegister = async(req,res) =>{
    try {

        //requesting from json
        const { firstname, lastname, email,  password } = req.body; 

        //finding if the user exists
        const user = await User.findOne({email }); 
        
        if (user) return res.status(500).send({ success: false, message: " Email Alredy Exist " });
        //if the user dont exists hash the password
        const hashPassword = bcryptjs.hashSync(password, 10); 

        //creating the user
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashPassword,
        })
        
        //assigning jwt for the user
        if (newUser) {
            await newUser.save();
            jwtToken(newUser._id,res);
            
        } else {
            res.status(500).send({ success: false, message: "Inavlid User Data" })
        }

        res.status(201).send({
            _id: newUser._id,
            firstname: newUser.firstname,
            lastname: newUser.username,
            email: newUser.email,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}

export const userLogin = async (req, res) => {
    try {
        //getting the user credentials for login
        const { email, password } = req.body;
        //finding if the user exists or not
        const user = await User.findOne({ email })
        if (!user) return res.status(500).send({ success: false, message: "Email Dosen't Exist " })
        //comparing the user entered password and password saved in database    
        const comparePasss = bcryptjs.compareSync(password, user.password || "");
        if (!comparePasss) return res.status(500).send({ success: false, message: "Email Or Password dosen't Matching" })
        
        //assigning the jwt 
        const token = jwtToken(user._id);
        

        res.status(200).send({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email:user.email,
            walletaddress:user.walletaddress,
            rank: user.rank,
            points: user.points,
            token: token,
            message: "Succesfully LogIn"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}

export const userLogOut=async(req,res)=>{
    
    try {
        //logout so clear the cookie
        res.cookie("jwt",'',{
            maxAge:0
        })
        res.status(200).send({success:true ,message:"User LogOut"})

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}

export const userWalletAdd = async(req,res) =>{

       const  userId  = req.user._id;
       const { walletaddress } = req.body;
       const userFull = req.user;
       console.log(userFull)
      
       try {
      
        const updatedUser = await User.findByIdAndUpdate(
            userId  ,         // ID of the user
            { walletaddress: walletaddress },   // New data to update
            { new: true }            // Returns the updated document
          );
        

      res.status(200).send({
        message: "Succesfully walletadress added"
    })
   } catch (error) {
    res.status(500).send({
        success: false,
        message: error
    })
    console.log(error);
   }
}



export const increaseUserPoints = async (req, res) => {
  try {
    const  userId = req.user._id;;
    const { points  } = req.body; // Default increment is 1 if not provided

    if (points <= 0) {
      return res.status(400).json({ message: "Points must be a positive value" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { points: points } }, // Increment points by given value
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Points updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


