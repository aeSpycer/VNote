const user = require('../models/user.model.js');

const signup = async (req, res) => {

    const { email, password, username } = req.body;

    try {

        const newUser = new user({

            username,
            email,
            password
    
        });
    
        await newUser.save();
        
        res.send("registrando");

    } catch (error) { console.log(error); }

}

const login = (req, res) => res.send('Iniciar sesion');

module.exports = { signup, login };