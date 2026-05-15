/*
name,
lastName,
email,
password,
phone,
specialty, 
isActive,
isVerified, 
loginAttempts,
timeOut
*/

import {Schema, model} from "mongoose";

const teacherSchema = new Schema (
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
        phone: {
            type: String
        },
        specialty: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
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
    },{
        strict: false,
        timestamps: true
    }
);

export default teacherModel("Teachers", teacherSchema);