import { NextApiRequest, NextApiResponse } from "next";
import { getZipcode } from "../../lib/zipcode";

type ResponseData = {
  message: string;
  success: boolean;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    // let zipcode = req.body.zipcode;
    // let housenumber = req.body.housenumber;

    let token = req.cookies["token"];

    if (token) {
      let api_res = await getZipcode(req);

      if (api_res.success) {
        res.status(200).json({
          message: "Success",
          success: true,
          data: api_res.data,
        });
      } else {
        res.status(400).json({
          message: "Failed",
          success: false,
          data: api_res.data,
        });
      }
    } else {
      res.status(401).json({
        message: "Unauthorized",
        success: false,
        data: token,
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
