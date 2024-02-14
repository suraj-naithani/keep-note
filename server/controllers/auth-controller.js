const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const home = async (req, res) => {
    try {
        res.status(200).send('Hello User👋')
    } catch (error) {
        res.status(404).send({ msg: "Not found" });
    }
}

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existUser = await User.findOne({ email: email });

        if (existUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // const salt = bcrypt.genSaltSync(10);
        // const hashPassword = await bcrypt.hash(password, salt);

        const userCreated = await User.create({ username, email, password });

        res.status(201).json({
            msg: "registration successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        })
    } catch (error) {
        res.status(404).json({ msg: 'Registration Error', error });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ msg: "User Not exist" });
        }

        // const isPasswordValid = await bcrypt.compare(password, userExist.password);
        const isPasswordValid = await userExist.comparePassword(password);

        if (isPasswordValid) {
            res.status(200).json({
                msg: "Login successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({ msg: "invalid email or password" })
        }
    } catch (error) {
        res.status(404).json({ msg: 'Login Error' });
    }
}

const user = async (req, res) => {
    try {
        const userData = req.user;
        // console.log(userData);
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { register, login, home, user };