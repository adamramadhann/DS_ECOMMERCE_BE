import { request, response } from "express";
import path from "path";
import multer from "multer";
import { db } from "../Conn";

const uploadDir = path.resolve(__dirname, "../../image/products");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const randomData = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, randomData + path.extname(file.originalname));
    }
});

export const upload = multer({ storage });

const CreateProduck = async (req = request, res = response) => {
    const { name_product, price, description } = req.body;
    const img_product = req.file ? req.file.filename : null; 

    if (!img_product) {
        return res.status(400).json({ message: "File gambar produk tidak diunggah" });
    }

    try {
        const dataProduck = await db.Products.create({
            data: { name_product, price, description, img_product }
        });

        console.info(dataProduck);

        res.status(200).json({
            message: "Create data success",
            dataProduck
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Create data error", error
        });
    }
};

export default CreateProduck;
