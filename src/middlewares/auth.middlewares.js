import jwt from "jsonwebtoken";
  


const authorize = async (req, res, next) => {
  try {
    let token ;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
      token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
      return res.status(401).json({
        success: false,
        message: "Unathorized, no token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    
    if(!user) return res.status(401).json({
      success: false,
      message: "Unauthorized, user not found",
    });

    req.user = user;
    next();
  } catch (error) {                                             
    res.status(401).json({
      success: false,
      message: "Unauthorized, invalid token",
    });
  }};

export default authorize;