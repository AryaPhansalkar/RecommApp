import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error("Please define MONGO_URI");
}

const MONGO_URI=process.env.MONGO_URI;

if(!MONGO_URI){
    throw new Error("please define mongo uri");
}

let cached = global.mongoose;
if(!cached){
    cached = global.mongoose = {
        conn:null,
        promise:null
    };
}

async function dbConnect(){
    if(cached.conn){
        return cached.conn;
    }
    
    if(!cached.promise){
        const opts={
            bufferCommands:false
        };

        cached.promise=mongoose.connect(MONGO_URI,opts);
    }

    try{
        cached.conn =await cached.promise;
    }
    catch(e){
        cached.promise=null;
        throw new Error(e);
    }
    return cached.conn;
}

export default dbConnect;