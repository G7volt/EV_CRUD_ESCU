/*
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
*/

import {Schema, model} from "mongoose";

const studentsSchema = new Schema(
    {
        name: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        birthdate: {
            type: Date
        },
        phone: {
            type: String
        },
        grade: {
            type: Number
        },
        isActive: {
            type: Boolean,
        },
        isVerified: {
            type: Boolean
        }, 
        loginAttempts: {
            type: Number
        },
        timeOut: {
            type: Date
        }
    }, {
        strict: false. valueOf,
        timestamps: true
    }
);

export default model("Students", studentsSchema);