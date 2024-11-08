import { Router } from "express";
import CreateProduck, { upload } from "../produck/CreateProduck";
import MiddlewareHeaders from "../middlewer/MiddlewerHeaders";


const RouteProduck = Router()
RouteProduck.post("/api/products/create", MiddlewareHeaders,upload.single("img_product"), CreateProduck,)

export default RouteProduck