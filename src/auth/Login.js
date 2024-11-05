import { request, response } from "express";
import { db } from "../Conn";
import bcryptjs from "bcryptjs"
import jwt  from "jsonwebtoken";

const Login = async (req = request, res = response) => {
    const {email, password} = req.body
    const emailLower = email.toLowerCase()

    try {
        const user = await db.user.findUnique({
            where : {
                email : emailLower
            }
        })

        if(!user) {
            return res.status(403).json({
                message : "user must be unique"
            })
        }

        const bycrpt = await bcryptjs.compare(password, user.password)

        if(!bycrpt) {
            return res.status(203).json({
                message : "password undifind"
            })
        }

        const token = await jwt.sign({userId : user.id}, process.env.PORT_VITE_ROUTE, {expiresIn : "1d"})
        if(!token) {
            return res.status(403).json({
                message : "token infalid"
            })
        }

        res.status(201).json({
            message : "Login succes",
            user, token
        })
    } catch (error) {
        console.info(error)
        res.status(500).json({message : "error ni Brooo"})
    }
}  

export default Login