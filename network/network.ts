import axios from "axios";
axios.defaults.withCredentials = true;
const baseURL =
  process.env.REACT_APP_BASE_URL ||
  "https://acceptatie.woonmatchwaterland.nl/api_neo/v3/index.cfm?endpoint=";

const headers = () => {
  let headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const xhrRequest = async function <T>(
  method: "POST" | "GET" | "PUT" | "DELETE",
  params: {
    baseUrl?: string;
    endPoint: string;
    withCredentials?: boolean;
    headers?: any;
    query?: any;
    data?: any;
  }
) {
  const _headers = headers();
  const newHeaders = params.headers ? { ..._headers } : _headers;
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
    return await axios(options);
  } catch (error) {
    console.log(error);
  }
};

export const performFormDataHttp = async function <T>(
  method: "POST" | "GET" | "PUT" | "DELETE",
  params: {
    endPoint: string;
    withCredentials?: boolean;
    headers?: any;
    data?: any;
  }
) {
  try {
    let response = await fetch(`${baseURL}${params.endPoint}`, {
      method: method,
      body: params.data,
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const clientRequest = async function <T>(
  method: "POST" | "GET" | "PUT" | "DELETE",
  params: {
    baseUrl?: string;
    path: string;
    withCredentials?: boolean;
    query?: any;
    data?: any;
  }
) {
  const headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const options = {
    url: "/api/" + params.path,
    method: method,
    withCredentials: true,
    credentials: "same-origin",
    timeout: 60000,
    headers: headers,
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
