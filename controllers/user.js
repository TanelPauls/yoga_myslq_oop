const bcrypt = require('bcrypt');
const userDbModel = require('../models/user.js');
const userModel = new userDbModel();

class userController {
    async register(req, res){
        const cryptPassword = await bcrypt.hash(req.body.password, 10)
        const registeredId = await userModel.create({
            username: req.body.username,
            email: req.body.email,
            password_hash: cryptPassword
        })
        if(registeredId){
            const userData = await userModel.findById(registeredId);
            req.session.users= {
                username: userData.username,
                user_id: userData.id
            }
            res.json({
                message: "New user is registered.",
                user_session: req.session.users
            })
        }
    }
}

module.exports = userController