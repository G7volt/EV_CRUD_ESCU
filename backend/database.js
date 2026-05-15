import mongoose, { connect } from "mongoose"; 
import { config } from "./SRC/config.js";

mongoose.connect(config.db.DB_URI)

const connection = mongoose.connection; 

connection.once("open", () => {
    console.log("Succesfull DB connection")
})

connection.on("disconnected", () => {
    console.log("DB is disconnected")
})

connection.on("error", (error) => {
    console.log("Error, not found " + error)
})