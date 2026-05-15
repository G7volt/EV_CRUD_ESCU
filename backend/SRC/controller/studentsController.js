import studentsModel from "../models/students.js";

const studentsController = {};

studentsController.getStudents = async(req, res) => {
    try {
        const students = await studentsModel.find();
        res.json(students);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error " + error})
    }
}

studentsController.updateStudents = async(req, res) => {
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
        }= req.body

        password = password.trim();
        email = email.trim();

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error " + error})
    }
}