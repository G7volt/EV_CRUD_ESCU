import homeworkModel from "../models/homework.js";

const homeworkController = {};

homeworkController.getHomework = async(req, res) => {
   try {
        const homework = await homeworkModel.find();
        return res.status(200).json(homework);
   } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error " + error})
   }
}

homeworkController.insertHomework = async(req, res) => {
    try {
        let{
        title,
        description,
        dueDate,
        priority,
        status
    } = req.body

    const newHomework = new homeworkModel({
        title,
        description,
        dueDate,
        priority,
        status
    });

    await newHomework.save();
    return res.status(200).json({message: "Tarea Agregada"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error " + error})
    }
}

homeworkController.updateHomework = async(req, res) => {
try {
    let{
        title,
        description,
        dueDate,
        priority,
        status
    }= req.body

    await homeworkModel.findByIdAndUpdate(
        req.params.id,
        {
            title,
            description,
            dueDate,
            priority,
            status
        }, {new: true},
    );

    if (!updateHomework) {
        return res.status(404).json({message: "Tarea no encontrada"})
    }

    return res.status(200).json({message: "Tarea Actualizada"});
} catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error " + error})
}
};

homeworkController.deleteHomework = async(req, res) => {
    try {
        await homeworkModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Tarea eliminada"});

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error " + error})
    }
}

export default homeworkController;