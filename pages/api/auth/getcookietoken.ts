import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
  success: boolean;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    
    let token = req.cookies["token"];

    res.status(200).json({
      message: "Success",
      success: true,
      data: token,
    });

  } else {
    res.status(405).json({
      message: "Method not allowed",
      success: false,
    });
  }
}
