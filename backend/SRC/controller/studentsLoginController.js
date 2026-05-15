import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import studentModel from "../models/students.js";
import {config} from "../config.js";

const studentLoginController = {};

studentLoginController.login = async(req, res) => {
    try {
        
        const {email, password} = req.body;
        const userFound = await studentModel.findOne({email});

        if(!userFound){
            return res.status(404).json({message: "Estudiante no econtrado"})
        }

        if(userFound.timeOut && userFound.timeOut > Date.now()){
            return res.status(403).json({message: "Cuenta bloqueada, intentelo mas tarde"});
        }

        const isMatch = await bcrypt.compare(password, userFound.password)

        if (!isMatch) {
            userFound.loginAttempts = (userFound.loginAttempts) + 1;

            if (userFound.loginAttempts >= 5) {
                userFound.timeOut = Date.now() + 15 * 60 * 1000;
                userFound.loginAttempts = 0;
                await userFound.save();
            }
            return res.status(401).json({message: "Contraseña incorrecta"})
        }

        userFound.loginAttempts = 0;
        userFound.timeOut = null;
        await userFound.save();

        const tokenCode = jsonwebtoken.sign(
            {id: userFound._id, userType: "student"},
            config.JWT.secret,
            {expiresIn: "30d"},
        );

        res.cookie("authCookie", tokenCode);
        return res.status(200).json({message: "Login Exitoso"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error " + error})
    }
}

export default studentLoginController;