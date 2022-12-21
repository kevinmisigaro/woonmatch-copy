import React, { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layouts/PlainLayout";
import { RegisterLoadingSpinner } from "../components/Registration/LoadingSpinner";

export default function ForgotPassword() {
  const router = useRouter();
  const [mail, setMail] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setSubmitting(true);
    const data = { mail };
    // const response = await xhrRequest<boolean>('POST', { endPoint: '/user/passwordrecovery', data });
    // if (response) {
    //     console.log(response.data)
    // }
    setSubmitting(false);
  };

  const inputClasses: string =
    "border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-full py-1";

  return (
    <Layout title="Password Reset">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-login">
          <div className="flex flex-col justify-center items-center w-full h-full bg-black bg-opacity-50 text-white">
            <div className="px-8 md:px-24 lg:px-32 2xl:px-40 py-10 lg:py-0">
              <h3 className="text-3xl mb-12">Herstel je wachtwoord</h3>

              <h2 className="text-3xl md:text-4xl lg:text-8xl mb-4 pt-5 pb-4 md:mb-8">
                Het is <br />
                makkelijk
                <br />
                en snel
              </h2>

              <p className="font-light text-base md:text-lg lg:text-lg">
                Gebruik je e-mailadres om een <br />
                herstellink aan te vragren.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex flex-col justify-center w-full lg:min-h-screen px-6 sm:px-8 md:px-24 xl:px-36">
            <Link href="/">
              <img
                src="images/logo-colored.svg"
                className="w-20 lg:w-40 h-auto mt-8 lg:mt-0 mb-20"
              />
            </Link>

            <form
              className="flex flex-col items-center space-y-6 lg:space-y-10 w-full"
              onSubmit={onSubmit}>
              <div className="relative w-full">
                <label
                  htmlFor="email"
                  className="flex items-center space-x-2 font-medium text-sm">
                  <img src="/icons/gmail.svg" className="w-4" />
                  <span>E-mailadres*</span>
                </label>
                <input
                  type="email"
                  className={inputClasses}
                  value={mail}
                  onChange={(evt) => {
                    setMail(evt.target.value);
                  }}
                />
              </div>

              <button className="flex justify-center text-white font-light bg-tertiary px-4 py-2 w-full rounded-md">
                {submitting ? (
                  <RegisterLoadingSpinner />
                ) : (
                  <span>Vraag herstellink aan</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
