import jwt from "jsonwebtoken"


//assigning json webtoken with userid and response
const jwtToken = (userId )=>{
   
     return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};


export default jwtToken