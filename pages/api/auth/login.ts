import { NextApiRequest, NextApiResponse } from "next";
import { cookieSerializeOptions, userLogin } from "../../../lib/auth";
import cookie from "cookie";

type ResponseData = {
  message: string;
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    let username = req.body.mail;
    let password = req.body.password;

    let api_res = await userLogin(username, password);
    if (api_res.success) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", await api_res.token, cookieSerializeOptions)
      );
      res.status(200).json({
        message: "Success",
        success: true,
      });
    } else {
      res.status(400).json({
        message: api_res.message,
        success: false,
      });
    }
  } else {
    res.status(405).json({
      message: "Method not allowed",
      success: false,
    });
  }
}
