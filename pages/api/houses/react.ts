import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { validateCookieExistence } from "../../../lib/auth";
import {
  httpRequest,
  ResponseData,
  validateMethod,
} from "../../../lib/network";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case "POST":
      validateCookieExistence(req, res);

      let results: any = await react(req);

      res.status(200).json({
        message: !results?.isAxiosError ? "Success" : "Failed",
        success: !results?.isAxiosError,
        data: results?.data,
      });

      break;
    case "DELETE":
      validateCookieExistence(req, res);

      try {
        let del_results: any = await deleteReaction(req);

        if (!del_results?.isAxiosError) {
          res.status(200).json({
            message: "Success",
            success: true,
            data: del_results.data,
          });
        } else {
          res.status(400).json({
            message: del_results?.message,
            success: false,
            data: null,
          });
        }
      } catch (e: any) {
        console.log(e);
      }

      break;

    default:
      validateMethod(req, res, "POST");
  }
}

export const react = async (req: NextRequest | NextApiRequest) => {
  return await httpRequest(
    "POST",
    {
      endPoint: "/houses/react",
      data: {
        house: req.body.house,
      },
    },
    req
  );
};

export const deleteReaction = async (req: NextRequest | NextApiRequest) => {
  return await httpRequest(
    "DELETE",
    {
      endPoint: "/houses/archive",
      data: {
        advert: req.body.advert,
      },
    },
    req
  );
};
