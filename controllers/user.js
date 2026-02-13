const bcrypt = require('bcrypt');
const userDbModel = require('../models/user.js');
const userModel = new userDbModel();

class userController {
    async register(req, res){
        try {

            //console.log(req.body.username);
            const existingUser = await userModel.findByUsername(req.body.username);
            //console.log(existingUser);
            if (existingUser) {
                return res.status(409).json({
                    error: "Username already exists."
                });
            }

            //console.log(req.body.email);
            const existingEmail = await userModel.findByEmail(req.body.email);
            //console.log(existingEmail);
            if (existingEmail) {
                return res.status(409).json({
                    error: "Email already exists."
                });
            }
            if (!req.body.password || req.body.password.length < 6) {
                return res.status(400).json({
                    error: "Password must be at least 6 characters long."
                });
            }

            const cryptPassword = await bcrypt.hash(req.body.password, 10);

            const registeredId = await userModel.create({
                username: req.body.username,
                email: req.body.email,
                password_hash: cryptPassword
            });

            const userData = await userModel.findById(registeredId);
            console.log(userData)

            req.session.users = {
                username: userData.username,
                user_id: userData.id
            };

            return res.status(201).json({
                message: "New user is registered.",
                user_session: req.session.users
            });

        } catch (err) {

            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    error: "Username already exists."
                });
            }

            console.error(err);
            return res.status(500).json({
                error: "Internal server error."
            });
        }
    }
}


module.exports = userController