import { httpRequest } from "./network";

export const letterType = {
  mra_invite_group: "interessepeiling", //"House Invite - First Letter",
  mra_invite_current: "uitnodiging", //"Resident Contact",
  mra_followup_group: "interessepeiling", //"Interest Confirmation - Second Letter",
  mra_followup_current: "interessepeiling", //"Interest Confirmation  - Second Letter",
  offer_without_meeting: "aanbieding", //"House offer",
  offer_with_meeting: "aanbieding", //"House offer",
  gauge_interest: "aanbieding definitief", //"Interest and Documents Confirmation",
};

export const getUserLetters = async (req: any) => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: `/user/letters/`,
    },
    req
  );
  if (res?.data) {
    return res.data;
  }
  return null;
};

export const getUserLetterOptions = async (req: any) => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: `/letter/option`,
    },
    req
  );
  if (res?.data) {
    return res.data;
  }
  return null;
};

export const getLetterData = async (req: any, letterId: string) => {
  const res = await httpRequest(
    "GET",
    {
      endPoint: `/letter/${letterId}/data`,
    },
    req
  );

  if (res?.data) {
    return res.data;
  }

  return null;
};
