import { NextApiRequest, NextApiResponse } from "next";
import { requestPartnerConnection } from "../../../lib/partner";

type ResponseData = {
    message: string;
    success: boolean;
    data?: any
  };
  
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
  ){
    if (req.method === "POST") {
        let api_res = await requestPartnerConnection(req);
    
        if (api_res.success) {
          
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