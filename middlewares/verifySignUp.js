const { models } = require('../models');
const User = models.users;

async function checkDuplicateUsernameOrEmail(req, res, next) {
    // Username - req.body.username
    if(!req.body.username || !req.body.email){
        res.send({message: "Kichi milibani!"});
    }
    
    const user = await User.findOne({where: {username: req.body.username}});
    
    if (user !== null) {
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return;
    }
    
    const userbyemail = await User.findOne({where: {email: req.body.email}});
    if (userbyemail === null) {
        next();
    }else{
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
    }
}


checkRolesExisted = (req, res, next) => {
    
    
}


const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};



module.exports = verifySignUp;