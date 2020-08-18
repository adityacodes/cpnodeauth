const config = require("../config/auth.config");
const { models } = require("../models");
const User = models.users;
const Role = models.roles;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  
    const user = await User.create({ 
		    username: req.body.username, 
		    email: req.body.email, 
		    password: bcrypt.hashSync(req.body.password, 8) 
		    
    }); 
    
    if(user instanceof User){
        res.send({ message: "User was registered successfully!" });
    }

};


exports.signin = async (req, res) => {
    
    if(!req.body.username || !req.body.password){
        res.send({message: "Kichi milibani!"});
    }
    
    const user  = await User.findOne({ 
                                where: { username: req.body.username }, 
                                include: { model: Role }
                            });
    
    var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );
    
    if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
    }
    
    var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
    });
    
    if(user === null){
        res.send("No such user!");
    }else{
        let data = user.toJSON();
        data.accesstoken = token;
        // res.send(JSON.stringify(user.roles[0].name));
        res.send(JSON.stringify(data));
    }

};

