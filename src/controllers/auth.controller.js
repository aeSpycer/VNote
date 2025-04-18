import User from '../models/user.model.js';
import bcrypt from 'bcryptjs'; // Modulo para encriptar la contraseña
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const signup = async (req, res) => {

    const { email, password, username } = req.body;

    try {

        const emailFound = await User.findOne({email});
        const usernameFound = await User.findOne({username});

        if (emailFound) return res.status(400).json(["The email already exists"]);
        if (usernameFound) return res.status(400).json(["The username already exists"]);

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password : passwordHash
        });
        const savedUser = await newUser.save();
        const token = await createAccessToken({ id : savedUser._id });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.json({
            id : savedUser._id,
            username : savedUser.username,
            email : savedUser.email
        });

    } catch (error) { res.status(500).json({ message : error.message }); }

}

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const userFound = await User.findOne({email});

        if (!userFound) return res.status(400).json({ message : "User not found"});

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json({ message : "Incorrect password"});

        const token = await createAccessToken({ id : userFound._id });
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        
        res.json({
            id : userFound._id,
            username : userFound.username,
            email : userFound.email,
            // cookie : token
        });

    } catch (error) { res.status(500).json({ message : error.message }); }

}

export const logout = (req, res) => {

    res.cookie('token', "", { expires : new Date(0), sameSite: "none" });
    return res.sendStatus(200);
}

export const getUser = async (req, res) => {

    const userFound = await User.findById(req.params.id);

    if (!userFound) return res.status(400).json({ message : "User not found" });

    return res.json({

        id : userFound._id,
        username : userFound.username,
        email : userFound.email

    })
}

export const getProfile = async (req, res) => {

    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({ message : "User not found" });

    return res.json({

        id : userFound._id,
        username : userFound.username,
        email : userFound.email

    })

}

export const setProfile = async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new : true });

        if (!user) return res.status(404).json({ message : "El nombre o el correo ya estan en uso." });

        res.json(user);

    } catch (error) {

        return res.status(404).json({ message : "El nombre o el correo ya estan en uso." });

    }

}

export const verifyToken = async (req, res) => {

    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {

        if (err) return res.status(401).json({ message: "Unauthorized" });

        const userFound = await User.findById(user.id);

        if (!userFound) return res.status(401).json({ message: "Unauthorized" });

        return res.json({

            id: userFound._id,
            username: userFound.username,
            email: userFound.email,

        })

    });

}
