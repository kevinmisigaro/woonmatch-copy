import { httpRequest } from "./network";

export const getPointsCalculations = async (req: any) => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: "/mra/pointcalculations",
    },
    req
  );
  if (res?.data) {
    return res.data;
  }
  return null;
};

export const getMraReactions = async (req: any) => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: "/mra/reactions",
    },
    req
  );
  if (res?.data) {
    return res.data;
  }
  return null;
};
