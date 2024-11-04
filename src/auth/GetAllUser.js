import { request, response } from "express";
import { db } from "../Conn";


const GetAllUser = async (req = request, res = response) => {
    try {
       const getAllData = await db.user.findMany() 
       res.status(201).json({
        message : "get all data succes",
        getAllData
       })
    } catch (error) {
        console.error(error)
    }
}

export default GetAllUser