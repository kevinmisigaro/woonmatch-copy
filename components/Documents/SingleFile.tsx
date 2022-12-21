import axios from "axios";
import React from "react";
import { BsFillCheckCircleFill, BsFillEyeFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { IoDownloadSharp } from "react-icons/io5";
import { VscFilePdf } from "react-icons/vsc";

export default function SingleFile({ file, setFiles, files }) {
  const onDelete = async () => {
    console.log(file.id);

    const tokenOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const tokenResponse = await fetch(`/api/auth/getcookietoken`, tokenOptions);
    const json_tokenResponse = await tokenResponse.json();

    let token = json_tokenResponse.data;

    const config = {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(
        `${
          process.env.NEXT_PUBLIC_API_URL ||
          "https://acceptatie.woonmatchwaterland.nl/api_neo/v3/index.cfm?endpoint="
        }/document/${file.id}`,
        config
      )
      .then((res) => {
        let data = [...files];
        let newArr = data.filter((x) => x.id !== file.id);
        setFiles([...newArr]);
      })
      .catch((err) => console.log(err.response.data));
  };

  const getDocument = async () => {
    console.log(file.id);

    const tokenOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const tokenResponse = await fetch(`/api/auth/getcookietoken`, tokenOptions);
    const json_tokenResponse = await tokenResponse.json();

    let token = json_tokenResponse.data;

    const config = {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_API_URL ||
          "https://acceptatie.woonmatchwaterland.nl/api_neo/v3/index.cfm?endpoint="
        }/document/${file.id}`,
        config
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div
      className="w-full flex flex-row justify-between px-3 py-3 items-center"
      key={file.id}>
      <div className="flex flex-col text-xs gap-y-2">
        <div className="flex flex-row gap-x-2">
          <VscFilePdf size={15} />
          <div className="flex flex-col">
            <p className="font-medium text-xs">{file.id}</p>
            <p className="text-xs font-light">Text description</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-x-3 items-center">
        <BsFillCheckCircleFill size={15} />
        <BsFillEyeFill
          className="text-primary hover:cursor-pointer"
          size={17}
        />
        <IoDownloadSharp
          onClick={getDocument}
          className="text-primary hover:cursor-pointer"
          size={16}
        />
        <FaTrash
          className="text-primary hover:cursor-pointer"
          onClick={onDelete}
          size={15}
        />
      </div>
    </div>
  );
}
