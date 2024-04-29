import { connect } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/utils/getTokenData";

connect();

export async function POST(request: NextRequest) {
  //extract data from token
  const userId = await getTokenData(request);

  const user = await User.findOne({ _id: userId }).select("-password");

  //check if there is no user

  return NextResponse.json({
    message: "User found",
    data: user,
  });
}
