    import { request, response } from "express";
    import jwt from "jsonwebtoken";

    const MiddlewerHeaders = async (req = request, res = response, next) => {
        try {
            // Cek apakah ada header authorization
            const headers = req.headers.authorization;
            if (!headers) {
                return res.status(403).json({
                    message: "Authorization headers missing"
                });
            }

            // Ambil token dari header
            const token = headers.split(" ")[1];

            // Verifikasi JWT
            jwt.verify(token, process.env.KEY, (error, decoded) => {
                if (error) {
                    if (error.name === "TokenExpiredError") {
                        return res.status(403).json({
                            message: "Token expired"
                        });
                    }
                    return res.status(403).json({
                        message: "Invalid token"
                    });
                }

                // Pastikan decoded memiliki uaserId
                if (!decoded || !decoded.userId) {
                    return res.status(401).json({
                        message: "User ID not found in token"
                    });
                }

                // Menyimpan userId ke request object untuk digunakan di route selanjutnya
                req.userId = decoded.userId;

                // Lanjutkan ke route selanjutnya
                next();
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal server error", 
                error: error.message
            });
        }
    };

    export default MiddlewerHeaders;
