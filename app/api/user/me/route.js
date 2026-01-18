import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import UserModel from "@/model/user";
import jwt from "jsonwebtoken";

export async function GET(request) {
  await dbConnect();

  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await UserModel.findOne({ email: decoded.email }).lean();

  if (!user) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  delete user.password;

  return NextResponse.json({
    success: true,
    data: {
      name: user.username,
      gamePreferences: user.gamePreferences || {}
    }
  });
}
