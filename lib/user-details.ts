import { httpRequest } from "./network";

export const getUserSummary = async (req: any) => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: "/user/steps/summary",
    },
    req
  );
  if (res) {
    return res.data;
  }
  return null;
};
