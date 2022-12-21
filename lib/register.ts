import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import { httpRequest } from "./network";

export const summary = async (req: NextRequest | NextApiRequest) => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: "/user/steps/summary",
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

export const getPreferences = async (req: NextRequest | NextApiRequest) => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: "/user/steps/preferences",
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

export const preferences = async (req: NextRequest | NextApiRequest) => {
  const data = {
    cities: req.body.cities,
    models: req.body.models,
    tipme: req.body.tipme,
    radius: req.body.radius,
    rooms: req.body.rooms,
    rent: {
      min: req.body.rent.min,
      max: req.body.rent.max,
    },
    communication: req.body.communication,
  };

  const res = await httpRequest(
    "POST",
    {
      endPoint: "/user/steps/preferences",
      data,
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
};

export const getSituationData = async (req: NextRequest | NextApiRequest) => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: "/user/steps/situation",
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

export const situation = async (req: NextRequest | NextApiRequest) => {
  const data = {
    rental: req.body.rental,
    renter: req.body.renter,
    buy: req.body.buy,
    social: req.body.social,
    corp: req.body.corp,
  };

  const res = await httpRequest(
    "POST",
    {
      endPoint: "/user/steps/situation",
      data,
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
};

export const getFamily = async (req: NextRequest | NextApiRequest) => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: "/user/steps/family",
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

export const family = async (req: NextRequest | NextApiRequest) => {
  const data = {
    people: req.body.people,
  };
  const res = await httpRequest(
    "POST",
    {
      endPoint: "/user/steps/family",
      data,
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
};

export const fifthRegister = async (req: NextRequest | NextApiRequest) => {
  const data = {
    letterhead: req.body.letterhead,
    dob: req.body.dob,
    city: req.body.city,
    gender: req.body.gender,
    email: req.body.email,
    phone: {
      mobile: req.body.phone.mobile,
      landline: req.body.phone.landline,
    },
    initials: req.body.initials,
    lastname: req.body.lastname,
    cc_email: "",
    zipcode: req.body.zipcode,
    housenumber: req.body.housenumber,
    street: req.body.street,
    income: req.body.income,
    language: "",
    country: "",
    nationality: "",
    firstname: "",
  };

  const res = await httpRequest(
    "POST",
    {
      endPoint: "/user/steps/partner/new",
      data,
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
};

export const firstRegister = async (req: NextRequest | NextApiRequest) => {
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
    phone: {
      mobile: req.body.phone.mobile,
      landline: req.body.phone.landline,
    },
    email: req.body.email,
    city: req.body.city,
  };

  const res = await httpRequest(
    "POST",
    {
      endPoint: "/user/steps/naw",
      data,
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
};
