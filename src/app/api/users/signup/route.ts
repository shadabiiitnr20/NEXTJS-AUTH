import bcryptjs from "bcryptjs";
import { connect } from "@/config/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/utils/mailer";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;

    //Validation
    console.log(reqBody);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    //send verification mail

    await sendEmail({ email, emailType: "Verify", userId: savedUser._id });
    return NextResponse.json({
      message: "User Registered Successfully",
      success: true,
      savedUser
    })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
