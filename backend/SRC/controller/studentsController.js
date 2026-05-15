import studentsModel from "../models/students.js";

const studentsController = {};

studentsController.getStudents = async(req, res) => {
    try {
        const students = await studentsModel.find();
        return res.status(200).json(students);
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error " + error})
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

        const updateStudent = await studentsModel.findByIdAndUpdate(
            req.params.id,{
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
            }
        )

        if (!updateStudent) {
        return res.status(404).json({message: "Estudiante no encontrado"});
    }

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error " + error})
    }
}

studentaController.deleteStudents = async(req, res) => {
    try {
        await studentsModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Estudiante eliminado"});

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error " + error})
    }
}