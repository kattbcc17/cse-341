import express from "express"
import dotenv from 'dotenv'
import UsersRoutes from './routes/users.routes.js'
import MongoDB from './db/mongo.js'

dotenv.config()
const port = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.get("/", (req,res) => {
     res.send("Hola Mundo")
});

app.use(UsersRoutes)

MongoDB.initDb((error, mongodb) => {
    if (error) {
        console.error(error)
    } else {
        
        app.listen(port, () => {
            console.log(`Servidor escuchando en el puerto ${port}`)
        })
    }
})
