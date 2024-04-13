import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/error.js";

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`ERROR: ${err}`);
    console.log("Shutting down due to uncaught exceptions");
    process.exit(1);
});

const app = express()
dotenv.config({path: "backend/config/config.env"});

//Connecting to DB
connectDatabase();

//This is to parse the incoming request body into JSON
app.use(express.json());

//Import all routes
import productRoutes from "./routes/products.js";

app.use("/api/v1", productRoutes);


//using error middlewares
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started on Port: ${process.env.PORT}!!!`);
    console.log(`Server started on runmode: ${process.env.NODE_ENV}!!!`);
});

process.on('unhandledRejection', (err) => {
    console.log(`ERROR : ${err}`);
    console.log("Shutting down server due to Unhandled promise rejection");
    server.close(()=>{
        process.exit(0);
    });
})