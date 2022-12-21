import { hasToekn } from "./auth";
import { httpRequest } from "./network";

export const fetchHouses = async (req: any, id: string = "") => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: hasToekn(req)
        ? `/houses/private/${id}`
        : `/houses/public/${id}`,
    },
    req
  );
  if (res?.data) {
    return res.data;
  } else {
    console.log("Error while fetching house with id: ", id);
    console.log(res);
  }
  return null;
};

export const fetchSimilarHouses = async (req: any, id) => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: `/houses/related/${id}`,
    },
    req
  );
  return res.data;
};

export const fetchHousesOfTheWeek = async (req: any) => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: `/houses/bestfit`,
    },
    req
  );
  //  console.log("resresresresres", res);
  if (res.data) {
    return res.data;
  } else {
    return null;
  }
};

export const fetchArchive = async (req: any) => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: "/houses/archive",
    },
    req
  );
  return res.data;
};

export const getHouseInviteData = async (req: any, letterId: string = "") => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: `/letter/${letterId}/data`,
    },
    req
  );
  return res.data;
};

function validateArrayParamValues(values) {
  if (values.length == 1) {
    if (values[0] == "") {
      return null;
    }
  }
  return values;
}

export const fetchHousesByParams = async (req, params) => {
  const _params = {
    city: validateArrayParamValues(params.city),
    type: validateArrayParamValues(params.type),
    rentMin: parseFloat(params.rentMin),
    rentMax: parseFloat(params.rentMax),
    rooms: parseFloat(params.rooms),
    keyword: params.keyword,
  };

  const res = await httpRequest(
    "POST",
    {
      endPoint: hasToekn(req) ? `/houses/private` : `/houses/public`,
      data: _params,
    },
    req
  );

  return res.data;
};

export const getFilters = async () => {
  const res = await fetch(`${process.env.API_URL}/houses/filter`);
  const data = await res.json();

  return data;
};

export const getSearchParams = (query) => {
  return {
    ...query,
    city: query?.city ? query.city.split(",") : [],
    type: query?.type ? query.type.split(",") : [],
  };
};
