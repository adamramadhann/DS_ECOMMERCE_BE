import { request, response } from "express";
import bcryptjs from "bcryptjs"
import { db } from "../Conn.js";
import path from "path"
import fs from "fs"

export const Register = async (req = request, res = response) => {
    const { name, email, password, img_profile } = req.body
    const emailCase = email.toLowerCase()
    const hashPassword = await bcryptjs.hash(password, 10)

    try {
        const findUser = await db.user.findUnique({
            where : {
                email : emailCase
            }
        });

        if (findUser) {
            return res.status(403).json({
                message : "email harus unikkk"
            })
        };

        // mengecek format image profile menggunakan base 64
        const mimeType = img_profile.match(/data:(image\/\w+);base64,/);

        if(!mimeType) {
            return res.status(403).json({
                message: "type image invalid"
            })
        };

        const mime = mimeType[1];
        const extensi = mime.split("/")[1]

        // menghapus prefix base64 untuk mendapatkan data yang bisa diubah menjadi buffer
        const base64Data = img_profile.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64')
        const imageDir = path.join(__dirname, "../../image/profile")

        // cek dan jika belum memiki depesitory lalu buat disepetory nya 
        if(!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, { recursive : true})
        }

        const imagePath = path.join(imageDir, `${email}-profile.${extensi}`)
        fs.writeFileSync(imagePath, buffer)

        const fileName = `${email}-profile.${extensi}`

        const dataRegister = await db.user.create({
            data : {
                name,
                email : emailCase,
                password : hashPassword,
                img_profile : fileName
            }
        })

        res.status(201).json({
            message : "create data succes !",
            dataRegister
        })

    } catch (error) {
        res.status(500).json({
            message : "error brooo",
            error
        });
        console.error(error)
    }
}