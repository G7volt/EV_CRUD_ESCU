import homeworkModel from "../models/homework.js";

const homeworkController = {};

homeworkController.getHomework = async(req, res) => {
   try {
        const homework = await homeworkModel.find();
        res.json(homework);
   } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error " + error})
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
    res.json({message: "Tarea guardada"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error " + error})
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
    )

    res.json({message: "Tarea Actualizada"});
} catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error " + error})
}
};

homeworkController.deleteHomework = async(req, res) => {
    try {
        await homeworkModel.findByIdAndDelete(req.params.id);
        res.json({message: "Tarea eliminada"});

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error " + error})
    }
}

export default homeworkController;