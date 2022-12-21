import React, { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layouts/PlainLayout";
import { RegisterLoadingSpinner } from "../components/Registration/LoadingSpinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordResetPage: React.FC<any> = () => {
  const [revealPasswordConfirm, setRevealPasswordConfirm] =
    useState<boolean>(false);
  const [revealPassword, setRevealPassword] = useState<boolean>(false);
  const router = useRouter();

  const changePasswordConfirmReveal = () => {
    setRevealPasswordConfirm(!revealPasswordConfirm);
  };

  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const changePasswordReveal = () => {
    setRevealPassword(!revealPassword);
  };

  const [passwordError, setPasswordError] = useState({
    errorExists: false,
    errorText: "",
  });

  const handlePasswordConfirmChange = (e) => {
    e.persist();
    setValues({
      ...values,
      confirmPassword: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    e.persist();
    setValues({
      ...values,
      password: e.target.value,
    });
  };

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setSubmitting(true);
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

            </div>
          </div>
        </div>

        <div className="bg-white w-full">
          <div className="flex flex-col justify-center w-full lg:min-h-screen px-6 sm:px-8 md:px-24 xl:px-36">
            <Link href="/">
              <img
                src="images/logo-colored.svg"
                className="w-20 lg:w-40 h-auto mt-8 lg:mt-0 mb-20"
              />
            </Link>

            <form
              className="flex flex-col space-y-6 lg:space-y-10 w-full"
              onSubmit={onSubmit}>
              <div className="input">
                <label
                  htmlFor="password"
                  className="flex items-center space-x-2 font-medium text-sm">
                  <img src="/icons/001-user.svg" className="w-4" />
                  <span>Maak hier uw nieuwe wachtwoord aan*</span>
                </label>
                <input
                  type={revealPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handlePasswordChange}
                  className={inputClasses}
                />
                {passwordError.errorExists && (
                  <>
                    <br />
                    <small className="text-red-400 text-xs font-light">
                      {passwordError.errorText}
                    </small>
                  </>
                )}
                {revealPassword ? (
                  <FaEyeSlash
                    className="password-reset-reveal text-green-700"
                    onClick={changePasswordReveal}
                  />
                ) : (
                  <FaEye
                    className="password-reset-reveal text-green-700"
                    onClick={changePasswordReveal}
                  />
                )}
              </div>

              <div className="input">
                <label
                  htmlFor="repeatePassword"
                  className="flex items-center space-x-2 font-medium text-sm">
                  <img src="/icons/001-user.svg" className="w-4" />
                  <span>Bevestig uw nieuwe wachtwoord*</span>
                </label>
                <input
                  type={revealPasswordConfirm ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handlePasswordConfirmChange}
                  className={inputClasses}
                />
                {revealPasswordConfirm ? (
                  <FaEyeSlash
                    className="password-reset-reveal text-green-700"
                    onClick={changePasswordConfirmReveal}
                  />
                ) : (
                  <FaEye
                    className="password-reset-reveal text-green-700"
                    onClick={changePasswordConfirmReveal}
                  />
                )}
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
};

export default PasswordResetPage;
