import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import { httpRequest } from "./network";

export const uploadDocument = async (req: NextRequest | NextApiRequest) => {
  const data = req.body.formdata;

  const res = await httpRequest(
    "POST",
    {
      endPoint: "/document",
      data,
    },
    req
  );

  if (res.success) {
    return {
      success: true,
      message: "Success",
    };
  } else {
    return {
      success: false,
      message: res.response.data,
    };
  }
};

export const getDocuments = async (req: NextRequest | NextApiRequest) => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: "/document",
    },
    req
  );

  if (res.status === 200) {
    return {
      success: true,
      message: "Success",
      data: res.data,
    };
  } else {
    return {
      success: false,
      message: res.response.data,
    };
  }
};

export const deleteDocument = async (req:  NextRequest | NextApiRequest) => {
  const res = await httpRequest(
    "DELETE",
    {
      endPoint: "/document",
      query: {
        id: req.body.id
      }
    },
    req
  );

  if (res.status === 200) {
    return {
      success: true,
      message: "Success",
    };
  } else {
    return {
      success: false,
      message: res.response.data,
    };
  }

}
