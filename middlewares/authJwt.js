const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { models } = require("../models");
const User = models.users;
const Role = models.roles;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
    
    const user = await User.findOne({ 
        where: {
            id: req.userId, 
        }, 
        include: [{
            model: Role,
            where: {
                name: 'admin'  
            }
        }]
    });
    
    if (!user) {
        res.status(401).send({ message: "Not known!" });
        return;
    }else{
        next();
    }
    
};

const authJwt = {
  verifyToken,
  isAdmin
};

module.exports = authJwt;