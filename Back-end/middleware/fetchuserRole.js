const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//To check User Role 
const fetchuserRole = async (req, res, next) => {
  const token = req.headers.token;
  console.log("TOKENNNN in medialware",token);
  
  if (!token) {
    return res.status(401).json({ message: "Authentication token not found", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Inside middleware", decoded);
    const userId = decoded.data; // Ensure that your JWT creation logic uses `data` to store user ID
    
    const user = await User.findById(userId).select('-password');
    console.log("User--------", user);
    
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    
    req.user = user; // Adding user to req object if further route handling needs user details
    if (user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        message: "You do not have access to this resource",
        success: false,
      });
    }
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: "Invalid token",
        success: false
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: "Token expired",
        success: false
      });
    }
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

module.exports = fetchuserRole;
