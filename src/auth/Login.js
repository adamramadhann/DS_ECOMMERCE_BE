import { request, response } from "express";
import { db } from "../Conn";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const Login = async (req = request, res = response) => {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase();

    try {
        // Mencari user berdasarkan email
        const user = await db.user.findUnique({
            where: {
                email: emailLower,
            },
        });

        // Memeriksa jika user tidak ditemukan
        if (!user) {
            return res.status(404).json({
                message: "User tidak ditemukan",
            });
        }

        // Membandingkan password yang dimasukkan dengan hash di database
        const isPasswordMatch = await bcryptjs.compare(password, user.password);

        // Memeriksa jika password salah
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Password salah",
            });
        }

        // Membuat token JWT untuk autentikasi
        const token = jwt.sign({ userId: user.id }, process.env.KEY, { expiresIn: "1d" });

        // Mengirim respons login sukses dengan data user dan token
        res.status(200).json({
            message: "Login berhasil",
            user,
            token,
        });
    } catch (error) {
        console.error("Terjadi error:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

export default Login;
