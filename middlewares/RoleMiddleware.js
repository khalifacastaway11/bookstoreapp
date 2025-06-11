//middlewares/Rolemiddleware.js
const authorize = (roles) => (req, res, next) => {
    const userRole = req.user.role;
    
    if (!roles.includes(userRole)) {
        return res.status(403).json({message:"you are not allowed to access here"});
    }
    next()
}
module.exports=authorize