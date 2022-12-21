import { NextApiRequest, NextApiResponse } from "next";
import { fetchUser } from "../../../lib/auth";

type ResponseData = {
  message: string;
  success: boolean;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    let token = req.cookies["token"];

    if (token) {
      let userRes = await fetchUser(req);

      if (userRes.status == 200) {
        res.status(200).json({
          message: "Success",
          success: true,
          data: userRes.data,
        });
      } else {
        res.status(200).json({
          message: "Failed",
          success: false,
          data: null,
        });
      }
    } else {
      res.status(200).json({
        message: "Not Loggedin",
        success: false,
        data: null,
      });
    }
  } else {
    res.status(405).json({
      message: "Method not allowed",
      success: false,
      data: null,
    });
  }
}
