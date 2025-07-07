import {PORT,MONGODB_URI,DB_NAME} from "./src/constants.js"
import {connectDataBase} from "./src/database/connection.db.js"
import {app} from "./src/app.js"

connectDataBase(MONGODB_URI,DB_NAME)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`app is listening at PORT ${PORT}`);
    })
})
.catch((error)=>{
    console.log(error);
})