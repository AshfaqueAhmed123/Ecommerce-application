import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})
import {connectDataBase} from "./src/database/connection.db.js"
import {app} from "./src/app.js"

connectDataBase(process.env.MONGODB_URI,process.env.DB_NAME)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`app is listening at PORT ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log(error);
})