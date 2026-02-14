const bcrypt = require('bcrypt');
const userDbModel = require('../models/user.js');
const userModel = new userDbModel();

class userController {

    async registerPage(req, res){
        res.render('register');
    }

    async register(req, res) {
        try {

            const { username, email, password } = req.body;

            const existingUser = await userModel.findByUsername(username);
            if (existingUser) {
                return res.status(409).render('register', {
                    error: "Username already exists.",
                    username,
                    email
                });
            }

            const existingEmail = await userModel.findByEmail(email);
            if (existingEmail) {
                return res.status(409).render('register', {
                    error: "Email already exists.",
                    username,
                    email
                });
            }

            if (!password || password.length < 6) {
                return res.status(400).render('register', {
                    error: "Password must be at least 6 characters long.",
                    username,
                    email
                });
            }

            const cryptPassword = await bcrypt.hash(password, 10);

            const registeredId = await userModel.create({
                username,
                email,
                password_hash: cryptPassword
            });

            const userData = await userModel.findById(registeredId);

            req.session.user = {
                id: userData.id,
                username: userData.username
            };

            return res.redirect('/');

        } catch (err) {
            console.error(err);
            return res.status(500).render('register', {
                error: "Internal server error."
            });
        }
    }

    
    async login(req, res){
        try {
            
            const existingUser = await userModel.findByUsername(req.body.username);

            if (!existingUser) {
                return res.status(401).json({
                    error: "Invalid username or password."
                });
            }

            const storedHash = await userModel.findPasswordHashById(existingUser.id);

            if (!storedHash) {
                return res.status(401).json({
                    error: "Invalid username or password."
                });
            }


            const passwordMatch = await bcrypt.compare(
                req.body.password,
                storedHash
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    error: "Invalid username or password."
                });
            }

            return res.status(201).json({
                message: "Logged in successfuly.",
                user_session: existingUser
            })
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                error: "Internal server error."
            });
        }
    }
}



module.exports = userController