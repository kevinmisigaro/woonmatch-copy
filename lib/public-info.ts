import { httpRequest } from "./network";

export const getAccountability = async (req: any) => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: "/accountability",
    },
    req
  );
  if (res) {
    return res.data;
  }
  return null;
};
