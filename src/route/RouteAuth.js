import { Router } from "express";
import { Register } from "../auth/Register";
import GetAllUser from "../auth/GetAllUser";
import Login from "../auth/Login";

const RouteAuth = Router()
RouteAuth.post("/api/user/register", Register)
RouteAuth.get("/api/user/getAll", GetAllUser)
RouteAuth.post("/api/user/login", Login)

export default RouteAuth