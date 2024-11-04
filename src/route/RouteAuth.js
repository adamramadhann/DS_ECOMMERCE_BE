import { Router } from "express";
import { Register } from "../auth/Register";
import GetAllUser from "../auth/GetAllUser";

const RouteAuth = Router()
RouteAuth.post("/api/user/register", Register)
RouteAuth.get("/api/user/getAll", GetAllUser)

export default RouteAuth