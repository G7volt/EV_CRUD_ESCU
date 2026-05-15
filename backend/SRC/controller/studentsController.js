import studentsModel from "../models/students.js";

const studentsController = {};

studentsController.getStudents = async(req, res) => {
    try {
        const students = await studentsModel.find();
        res.json(students);
    } catch (error) {

        res.status(500).json({message: "Internal Server Error " + error})
    }
}

studentsController.updateStudents = async(req, res) => {
    try {
        let{
            
        }= req.body
    } catch (error) {
        res.status(500).json({message: "Internal Server Error " + error})
    }
}