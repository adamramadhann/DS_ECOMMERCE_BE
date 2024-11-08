import express from "express"
import cors from "cors"
import env from "dotenv"
import RouteAuth from "./route/RouteAuth"
import RouteProduck from "./route/RouteProduct"


const app = express()
env.config()
const PORT = process.env.PORT_VITE_ROUTE

app.use(cors())
app.use(express.json({
    limit : "100mb"
}))

app.use(express.urlencoded({
    extended : true
}))

app.use(RouteAuth)
app.use(RouteProduck)

app.listen(PORT, () => {
    console.info(`
        ====================
        SERVER RUN PORT ${PORT}
        ====================
        `)
})