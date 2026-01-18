import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import UserModel from "@/model/user";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await dbConnect();

  const { scores } = await request.json();

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  await UserModel.findOneAndUpdate(
    { email: decoded.email },
    { gamePreferences: scores }
  );

  return NextResponse.json({ success: true });
}
