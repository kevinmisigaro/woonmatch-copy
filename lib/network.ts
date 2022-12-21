import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { NextRequest } from "next/server";

axios.defaults.withCredentials = true;
const baseURL = process.env.API_URL;

const getHeaders = () => {
  let headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  return headers;
};

export const httpRequest = async function <T>(
  method: "POST" | "GET" | "PUT" | "DELETE",
  params: {
    baseUrl?: string;
    endPoint: string;
    withCredentials?: boolean;
    headers?: any;
    query?: any;
    data?: any;
  },
  clientRequest?: NextRequest | NextApiRequest
) {
  let _headers = getHeaders();

  if (clientRequest) {
    let token = clientRequest.cookies["token"];

    if (token) {
      _headers.Authorization = `Bearer ${token}`;
    }
  }

  const newHeaders = params.headers
    ? { ..._headers, ...params.headers }
    : _headers;
  const options = {
    url: params.endPoint,
    method: method,
    baseURL,
    withCredentials: params.withCredentials ?? true,
    credentials: "same-origin",
    timeout: 60000,
    headers: newHeaders,
    params: params.query,
    data: params.data,
  };

  try {
    let res = await axios(options);
    return res;
  } catch (error) {
    return error;
  }
};

export type ResponseData = {
  message: string;
  success: boolean;
  data: any;
};

export const validateMethod = (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
  method: "POST" | "GET" | "PUT" | "DELETE"
) => {
  if (req.method !== method) {
    res.status(405).json({
      message: "Method not allowed",
      success: false,
      data: null,
    });
  }
};

export const returnInteranlServerError = (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  res.status(500).json({
    message: "Interanl server error",
    success: false,
    data: null,
  });
};
