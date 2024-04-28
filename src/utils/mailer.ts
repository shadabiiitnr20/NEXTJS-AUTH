import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "Verify") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "Reset") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER_ID,
        pass: process.env.MAILTRAP_USER_PASS,
      },
    });

    const mailOptions = {
      from: "shadab.iiitnr20@gmail.com",
      to: email,
      subject:
        emailType === "Verify" ? "Verify Your Email" : "Reset Your Password",
      html: `<p>Click <a href=${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}>here</a> to ${
        emailType === "Verify" ? "verify your email" : "reset your password"
      } or copy and paste the below link in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
