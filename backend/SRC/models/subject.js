/*
subjectName,
teacher_id,
isAvailable
 */
import {Schema, model} from "mongoose"

const subjectSchema = new Schema (
    {
        subjectName: {type: String},
        teacher_id: {
            type: mongoose.Schema.types.ObjectId,
            ref: "./teachers.js"
        },
        isAvailable: {
            type: Boolean
        }
    },
    {
        timestamps: true,
        strict: false .valueOf
    }
)

export default model ("Subject", subjectSchema);