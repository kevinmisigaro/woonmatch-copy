import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import { httpRequest } from "./network";

export const getZipcode = async (req: NextRequest | NextApiRequest) => {

  const res = await httpRequest(
    "GET", {
    query: {
      zipcode: req.body.zipcode,
      housenumber: req.body.housenumber,
    },
    endPoint: `/zipcode`,
  }, req);

  if (res.status === 200) {
    return {
      success: true,
      message: "Success",
      data: res.data,
    };
  } else {
    return {
      success: false,
      message: "Failed",
      data: res.message
    };
  }
};
