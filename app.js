import express from "express"
import dotenv from 'dotenv'
import UsersRoutes from './routes/users.routes.js'
import MongoDB from './db/mongo.js'
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json' assert { type: 'json' };


dotenv.config()
const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req,res) => {
     res.send("Hola Mundo")
});


app.use(UsersRoutes)

MongoDB.initDb((error, mongodb) => {
    if (error) {
        console.error(error)
    } else {
        
        app.listen(port, () => {
            console.log(`Servidor escuchando en el puerto ${port}`);
            console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
        })
    }
})
