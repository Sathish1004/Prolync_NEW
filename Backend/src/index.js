import "dotenv/config"
import connectDB from "./config/db.js";
import { app } from './app.js'


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(` -->our  Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Database connection failed !!! ", err);
    })
