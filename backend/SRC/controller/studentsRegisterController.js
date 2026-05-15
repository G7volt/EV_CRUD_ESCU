import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import studentModel from "../models/students.js"
import { config } from "../config.js";
import { text } from "stream/consumers";
import { error, info } from "console";

const registerStudent = {}

registerStudent.register = async(req, res) => {
    try {
        let{
            name,
            lastName,
            email,
            password,
            birthdate,
            phone,
            grade, 
            isActive,
            isVerified, 
            loginAttempts,
            timeOut
        }=req.body;

        
        const existsStudent = await studentModel.findOne({email});
        if (existsStudent){
            return res.status(400).json({message: "El Estudiante ya existe"})
        }

        const passwordHash = await bcryptjs.hash(password, 10);

        const verificationCode = crypto.randomBytes(3).toString("hex");

        const tokenCode = jsonwebtoken.sign(
            {
                name,
                lastName,
                email,
                password,
                birthdate,
                phone,
                grade, 
                isActive,
                isVerified, 
                loginAttempts,
                timeOut
            }, 
            config.JWT.secret,
            {expiresIn: "10m"}
        );

        res.cokie("verificationToken", tokenCode,{
            maxAge: 15*60*1000
        })

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            },
        })

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificacion de cuenta",
            text: "Para verificar tu cuenta, utiliza este codigo: " + verificationCode + " Expira en 10 minutos"
        }

        transporter.sendMail(mailOptions,(error,info)) = {
            if(error){
                console.log("error" + error);
                return res.status(500).json({message: "Hubo un error"})
            },
        }

        res.status(200).json({message: "Esudiante Registrado, verifica tu email"});

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error " + error})
    }
}

registerStudent.verifyCode = async(req, res) => {
    try {
        
        const {verificationCodeRequest} = req.body

        const token = req.cookie.verificationToken;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        let{
            name,
            lastName,
            email,
            verificationCode: storedCode,
            password,
            birthdate,
            phone,
            grade, 
            isActive,
            isVerified, 
            loginAttempts,
            timeOut
        }= decoded;

        if (verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Codigo Invalido"})
        }

        const newStudent = new studentModel({
            name,
            lastName,
            email,
            password: passwordHash,
            birthdate,
            phone,
            grade, 
            isActive: true,
            isVerified: true, 
            loginAttempts,
            timeOut
        })

        await newStudent.save();

        const student = await studentModel.findOne({email});
        student.isVerified = true
        await student.save();
        res.clearCookie("verificationToken");
        return res.status(200).json({message: "Email verificado exitosamente"});

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error " + error})
    }
}

export default registerStudent;