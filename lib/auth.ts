import { CookieSerializeOptions } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { httpRequest, ResponseData } from "./network";

const cookieJar = {
  cookies: undefined,
};

export const userRegister = async (
  passthrough: string,
  password: string,
  dob: string,
  email: string
) => {
  const data = {
    passthrough,
    password,
    dob,
    email,
  };

  const res: any = await httpRequest("POST", {
    endPoint: "/user/register",
    data,
  });

  if (res.status == 200) {
    if (res?.headers["set-cookie"]) {
      cookieJar.cookies = res.headers["set-cookie"];

      const tokenRes = await fetchRefreshToken();
      const token = tokenRes.data;

      return {
        success: true,
        message: "Success",
        token,
      };
    }
  } else {
    return {
      success: false,
      message: "Error",
      data: res.response.data,
    };
  }
};

export const userLogin = async (mail: string, password: string) => {
  const data = {
    mail,
    password,
  };

  const res = await httpRequest<boolean>("POST", {
    endPoint: "/login",
    data,
  });

  try {
    if (!res.isAxiosError) {
      if (res?.headers["set-cookie"]) {
        const token = storeTokenToCookie(res);

        return {
          success: true,
          message: "Success",
          token,
        };
      } else {
        return {
          success: false,
          message: "Error",
        };
      }
    } else {
      return {
        success: false,
        message: res.response.data.response,
      };
    }
  } catch (e) {
    console.log("******************* Login exception *******************");
    console.log(res);
    console.log(e);
    return {
      success: false,
      message: "Unknown error",
    };
  }
};

export const cookieSerializeOptions: CookieSerializeOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development",
  maxAge: 60 * 60 * 30, //30 days
  sameSite: "strict",
  path: "/",
};
const storeTokenToCookie = async (res): Promise<string> => {
  cookieJar.cookies = res.headers["set-cookie"];

  const tokenRes = await fetchRefreshToken();
  const token = tokenRes.data;
  return token;
};

export const ssoLogin = async (token: string) => {
  const res = await httpRequest<boolean>("GET", {
    endPoint: "/sso",
    data: {
      token,
    },
  });

  try {
    if (!res.isAxiosError) {
      if (res?.headers["set-cookie"]) {
        const token = storeTokenToCookie(res);

        return {
          success: true,
          message: "Success",
          token,
        };
      } else {
        return {
          success: false,
          message: "Error",
        };
      }
    } else {
      return {
        success: false,
        message: res.response.data.response,
      };
    }
  } catch (e) {
    console.log("******************* SSO Login exception *******************");
    console.log(res);
    console.log(e);
    return {
      success: false,
      message: "Unknown error",
    };
  }
};

export const userPrivacy = async (req: NextRequest | NextApiRequest) => {
  const data = {};

  const res = await httpRequest(
    "POST",
    {
      endPoint: "/user/steps/privacy",
      data,
    },
    req
  );

  if (res.status == 200) {
    return {
      success: true,
      message: "Success",
    };
  } else {
    return {
      success: false,
      message: "Error",
    };
  }
};

export const userLogout = async () => {
  const res = await httpRequest("GET", { endPoint: "/logout" });

  if (res.status == 200) {
    return {
      success: true,
      message: "Success",
    };
  } else {
    return {
      success: false,
      message: "Error",
    };
  }
};

export const fetchRefreshToken = async () => {
  return await httpRequest("GET", {
    endPoint: "/refresh",
    withCredentials: true,
    headers: {
      cookie: cookieJar.cookies,
    },
  });
};

export const fetchUser = async (req: NextRequest | NextApiRequest) => {
  return await httpRequest(
    "GET",
    {
      endPoint: "/user/steps/naw",
    },
    req
  );
};

export const hasToekn = (req: NextApiRequest) => {
  let token = req.cookies["token"];
  return token;
};

export const validateCookieExistence = (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  let token = req.cookies["token"];

  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
      success: false,
      data: null,
    });
  }
};

/*

Set-Cookie: jwtToken=%7B%22SESSION%22%3A%227d812000%2D1baa%2D49f7%2Dbdbc%2D5b6e919f2aa7%22%2C%22TOKEN%22%3A%22eyJhbGciOiJIUzUxMiJ9%2EeyJzdWIiOiI0QzYzNzMzQi0wRDRELTQ1NzktQUJEMi04MUZENUU0RTk5NTAiLCJleHAiOjE2NjYwODc2MzcsImlhdCI6MTY2NjAwMTIzNywic2NvcGUiOiJyZWZyZXNoIn0%2ESScILPAsMtGSPS0bVcHpY%2Dgbt0gvuiE1VAeFvDQ3g8vAU4LdurCu7%2DDiBrS1fgW5wBN7VZaF9vRPJE5wwhf7tw%22%2C%22ALLOWCHANGES%22%3Atrue%2C%22BACKUSER%22%3Afalse%2C%22ID%22%3A%224C63733B%2D0D4D%2D4579%2DABD2%2D81FD5E4E9950%22%2C%22HASHEDLOGIN%22%3Afalse%7D;Path=/;Domain=acceptatie.woonmatchwaterland.nl;Secure;HTTPOnly;SameSite=None
*/
