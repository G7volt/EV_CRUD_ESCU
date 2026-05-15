import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer"; 
import {config} from "../config.js";
import studentModel from "../models/students.js"
import { maxHeaderSize } from "http";
import { error } from "console";

const studentRecoveryPassword = {};

studentRecoveryPassword.requestCode = async(req, res) => {
    try {
        
        const {email} = req.body;

        const userFound = await studentModel.findOne({email});

        if(!userFound){
            return res.status(404).json({message: "Estudiante no encontrado"});
        } 
        const code = crypto.randomBytes(3).toString("hex");
        
        const token = jsonwebtoken.sign(
            {email, codeUserType: "cutomer"},
            config.JWT.secret,
            {expiresIn: "15m"},

            res.cookie("recoveryCookie", token, {maxAge: 15 * 60 * 1000})
        )

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        });

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Correo de recuperacion",
            body: "Usa este codigo para recuperar tu cuenta: " + code,
        }

        transporter.sendMail(mailOptions, ("error" + error)){
            if(error){
                console.log("error" + error);
                return res.status(500),json({message: "Internal server error"})
            }
        };

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error " + error})
    }
}