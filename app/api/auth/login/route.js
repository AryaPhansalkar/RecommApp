import { NextResponse } from "next/server";
import UserModel from "@/model/user.js";
import dbConnect from "@/config/db";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await dbConnect();

  const body = await request.json();

  const existUser = await UserModel.findOne({ email: body.email }).select("+password");

  if (!existUser) {
    return NextResponse.json(
      { success: false, message: "User does not exist" },
      { status: 404 }
    );
  }

  const validPassword = await existUser.comparePassword(body.password);

  if (!validPassword) {
    return NextResponse.json(
      { success: false, message: "Invalid password" },
      { status: 401 }
    );
  }

  // ✅ Create JWT
  const token = jwt.sign(
    { id: existUser._id, email: existUser.email, name: existUser.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const user = existUser.toObject();
  delete user.password;

  // ✅ Create response
  const response = NextResponse.json(
    { success: true, message: "Login successful", data: user },
    { status: 200 }
  );

  // ✅ Set persistent cookie
  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
  });

  return response;
}
