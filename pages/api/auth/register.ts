import { NextApiRequest, NextApiResponse } from "next";
import { userRegister } from "../../../lib/auth";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    let passthrough: string = req.body.passthrough;
    let password: string = req.body.password;
    let dob: string = req.body.dob;
    let email: string = req.body.email;

    let api_res = await userRegister(passthrough, password, dob, email);

    if (api_res.success) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", api_res.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 30, //30 days
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({
        message: "Success",
        success: true,
      });
    } else {
      res.status(400).json({
        message: api_res.message,
        success: false,
        data: api_res.data
      });
    }
  } else {
    res.status(405).json({
      message: "Method not allowed",
      success: false,
    });
  }
}
