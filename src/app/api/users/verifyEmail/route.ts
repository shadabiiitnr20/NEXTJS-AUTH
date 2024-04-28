import { connect } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { token } = reqBody;

    console.log(token);

    const verifiedUser = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!verifiedUser) {
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
    }

    console.log(verifiedUser);

    verifiedUser.isVerified = true;
    verifiedUser.verifyToken = undefined;
    verifiedUser.verifyTokenExpiry = undefined;

    await verifiedUser.save();

    return NextResponse.json(
      {
        message: "email verified successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
