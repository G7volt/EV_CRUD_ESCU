import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

import {config} from "../config.js";

import studentModel from "../models/students.js"

import { error, info } from "console";
import {decode} from "punycode";
import {json} from "express"

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
            {email, randomCode, UserType: "customer", verified: false},
            config.JWT.secret,
            {expiresIn: "15m"},

        )

        res.cookie("recoveryCookie", token, {maxAge: 15 * 60 * 1000})

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

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("error" + error);
                return res.status(500),json({message: "Internal server error"})
            }
        });

        return res.status(200).json({message: "Email Enviado"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error " + error})
    }
}

studentRecoveryPassword.verifyCode = async(res, req) => {
try {
         const { code } = req.body;

         const token = req.cookies.recoveryCookie
         const decoded = jsonwebtoken.verify(token, config.JWT.secret)

         if(code !== decoded.randomCode){
            return res.status(400).json({message: "invalid code"})
         }

         const newToken = jsonwebtoken.sign(
            
            {email: decoded.email, userType: "student", verified: true},
            
            config.JWT.secret,
            
            {expiresIn: "15m"}
         )

        res.cookie("recoveryCookie", newToken, {maxAge: 15 * 60 * 1000});

        return res.status(200).json({message: "Code verified succesfully"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"});
    }
};

studentRecoveryPassword.newPassword = async (req, res) => {
    try {
        
        const {newPassword, confirmNewPassword} = req.body;

        if (newPassword != confirmNewPassword) {
            return res.status(400).json({message: "las contraseñas no coinciden"})
        }

        const token = req.cookie.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if (!decoded.verified) {
            return res.status(400).json({message: "Codigo no verificado"})
        }

        const passwordHash = await bcrypt.hash(newPassword, 10)

        await studentModel.findOneAndUpdate(
            {email: decoded.email},
            {password: passwordHash},
            {new: true}
        )

        res.clearCookie("recoveryCookie");

        return res.status(200).json({message: "Contraseña Actualizada"})

    } catch (error) {
         console.log("error" + error)
        return res.status(500).json({message: "Internal server error"});
    }
}

export default studentRecoveryPassword;