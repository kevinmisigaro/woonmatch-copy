import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import { httpRequest } from "./network";

export const editPartner = async (req: NextRequest | NextApiRequest) => {

  const data = {
    income: req.body.income,
    letterhead: req.body.letterhead,
    lastname: req.body.lastname,
    street: req.body.street,
    zipcode: req.body.zipcode,
    housenumber: req.body.housenumber,
    initials: req.body.initials,
    cc_email: req.body.cc_email,
    gender: req.body.gender,
    dob: req.body.dob,
    phone: {
      mobile: req.body.phone.mobile,
      landline: req.body.phone.landline,
    },
    email: req.body.email,
    city: req.body.city,
  };

  const res = await httpRequest(
    "PUT",
    {
      endPoint: "/user/steps/partner",
      data
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

} 

export const getPartner = async (req: NextRequest | NextApiRequest) => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: "/user/steps/partner",
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
