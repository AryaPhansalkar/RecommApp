import {NextResponse} from "next/server";
import UserModel from "@/model/user.js";
import dbConnect from "@/config/db";


export async function POST(request){
    await dbConnect();
    const body = await request.json();

    const existUser= await UserModel.findOne({email:body.email}).select("+password");

    if(!existUser){
        return NextResponse.json(
            {success:false , message:"User does not exist"},
            {status:404}
        )
    }
    const validPassword = await existUser.comparePassword(body.password);

    if(!validPassword){
        return NextResponse.json(
            {success:false , message :"Invalid password"},
            {status:401}
        )
    }
    
    const user = existUser.toObject();
    delete user.password;
    return NextResponse.json(
        {success:true , message:"Login sucessful", data:user},
        {status:200}
    )
}