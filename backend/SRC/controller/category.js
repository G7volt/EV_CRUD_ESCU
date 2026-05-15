import categoryModel from "../models/categories.js";

const categoriesController = {};

categoriesController.getCategory = async(req, res) => {
   try {
        const category = await categoryModel.find();
        return res.status(200).json(category);
   } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error " + error})
   }
}

categoriesController.insertCategory = async(req, res) => {
    try {
        let{
        categoryName,
        description,
        color,
        isActive
    } = req.body

    const newCategory = new categoryModel({
        categoryName,
        description,
        color,
        isActive
    });

    await newCategory.save();
    return res.status(200).json({message: "Categoria Agregada"});
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error " + error})
    }
}

categoriesController.updateCategory = async(req, res) => {
try {
    let{
        categoryName,
        description,
        color,
        isActive
    }= req.body

    await categoryModel.findByIdAndUpdate(
        req.params.id,
        {
            categoryName,
            description,
            color,
            isActive
        }, {new: true},
    );

    if (!updateCategory) {
        return res.status(404).json({message: "Categoria no encontrada"})
    }

    return res.status(200).json({message: "Categoria Actualizada"});
} catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error " + error})
}
};

categoriesController.deleteCategory = async(req, res) => {
    try {
        await categoryModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Categoria eliminada"});

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error " + error})
    }
}

export default categoriesController;