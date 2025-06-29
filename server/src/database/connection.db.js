import mongoose from "mongoose"

const connectDataBase = async (db_uri,db_name) => {
    try {
        const instance = await mongoose.connect(`${db_uri}/${db_name}`)
        if(!instance){
            console.log("error connecting database!")
        }
        console.log(`database connected at ${instance.connection.name}`)
    } catch (error) {
        return error
    }
}

export {connectDataBase};