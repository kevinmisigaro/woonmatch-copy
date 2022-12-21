import { NextApiRequest, NextApiResponse } from "next";
import { userLogin, userLogout } from "../../../lib/auth";
import cookie from "cookie";

type ResponseData = {
  message: string;
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    let api_res = await userLogout();

    if (api_res.success) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 0,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({
        message: "Success",
        success: true,
      });
    } else {
      res.status(200).json({
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
