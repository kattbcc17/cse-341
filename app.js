import express from "express";
import dotenv from 'dotenv';
import UsersRoutes from './routes/users.routes.js';
import MongoDB from './db/mongo.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json' assert { type: 'json' };

dotenv.config();
console.log("MongoDB URI:", process.env.MONGO_URI);

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
    res.send("Hola Mundo");
});

app.use(UsersRoutes);

// 404 error handling for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong", error: err.message });
});

MongoDB.initDb((error, mongodb) => {
    if (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Exit the process if the database connection fails
    } else {
        app.listen(port, () => {
            console.log(`Servidor escuchando en el puerto ${port}`);
            console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
        });
    }
});
