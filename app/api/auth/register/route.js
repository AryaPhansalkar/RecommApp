import {NextResponse} from "next/server";
import UserModel from "@/model/user";
import dbConnect from "@/config/db";
import jwt from "jsonwebtoken";

export async function POST(request){
    await dbConnect();
    const body = await request.json();

    const existingUser = await UserModel.findOne({email:body.email});

    if(existingUser){
        return NextResponse.json(
            {success:false , message:"User already exists"},
            {status:409}
        );
    }

    const newUser = await UserModel.create(body);
    const response= NextResponse.json(
        {success: true , message:"User Registered sucessfully",data:newUser},
        {status:201}
    );

    const token = jwt.sign(
        {name:newUser.name, email:newUser.email},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    response.cookies.set("token", token, {
    httpOnly: true,
    maxAge:60*60*24*7,
    sameSite:"Lax",
    path: "/",
  });

    return response;
}