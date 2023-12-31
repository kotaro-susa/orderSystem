import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { email }: { email: string } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("user", user);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
