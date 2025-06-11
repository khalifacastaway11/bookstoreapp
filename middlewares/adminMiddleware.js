////middleware/adminMiddleware.js
const jwt=require('jsonwebtoken')
const User=require('../models/User')

const adminMiddleware=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1]
        console.log("Token recieved in admin middleware:",token)
        if(!token){
            return res.status(401).json({message:"Access denied no token provided"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=User.findById(decoded.id)
        if(!user||user.role!=="admin"){
            return res.status(403).json({message:"Access denied.only Admins are authorised"})
        }
        if(req.user.role!=="admin"){
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }
           
        req.user=user  //attach user to request object
        next()
    } catch(error){
        console.error("Admin middleware error",error)
        res.status(403).json({message:"You are not authorized to manage books. Only admins can access this section.. "})
    }
}

module.exports=adminMiddleware;

