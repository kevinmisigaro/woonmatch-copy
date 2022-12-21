import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layouts/PlainLayout";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RegisterLoadingSpinner } from "../components/Registration/LoadingSpinner";
import moment from "moment";

const LoginPage: React.FC<any> = () => {
  const router = useRouter();
  const [params, setParams] = useState(null);

  const [mail, setMail] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [password, setPassword] = useState<string>();
  const [revealPassword, setRevealPassword] = useState<boolean>(false);
  const [welcomeText, setWelcomeText] = useState("");

  const changePasswordReveal = () => {
    setRevealPassword(!revealPassword);
  };

  useEffect(() => {
    let _params = new URLSearchParams(window.location.search);

    setParams(_params);

    const [day, hour, am_pm] = moment().format("dddd,h,A").split(",");

    if (am_pm === "AM") {
      setWelcomeText("Goedemorgen!");
    } else {
      if (parseInt(hour) === 12 || parseInt(hour) < 6) {
        setWelcomeText("Goedemiddag!");
      } else {
        setWelcomeText("Goedeavond!");
      }
    }
  }, []);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorStatus(false);
    const data = { mail, password };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch("/api/auth/login", options);
    const json_response = await response.json();

    if (json_response.success) {
      setSubmitting(false);
      if (params.get("redirect")) {
        router.push(params.get("redirect"));
      } else {
        router.push("/");
      }
    } else {
      setErrorStatus(true);
      setErrorText(json_response.message);
      setSubmitting(false);
    }
  };

  const inputClasses: string =
    "border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-full py-1";

  return (
    <Layout title="Login">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-login">
          <div className="flex flex-col justify-center items-center w-full h-full bg-black bg-opacity-50 text-white">
            <div className="px-8 md:px-24 lg:px-32 2xl:px-40 py-10 lg:py-0">
              <h3 className="text-3xl mb-12">{welcomeText}</h3>

              <h2 className="text-3xl md:text-4xl lg:text-8xl mb-4 pt-5 pb-4 md:mb-8">
                Welkom <br /> terug
              </h2>

              <p className="font-light text-sm lg:text-base">
                Gebruik je e-mailadres om in te loggen
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex flex-col justify-center w-full lg:min-h-screen px-6 sm:px-8 md:px-24 xl:px-36">
            <Link href="/">
              <a>
                <img
                  src="/images/woonmatch-waterland-colored.png"
                  className="w-20 lg:w-40 h-auto mt-8 lg:mt-0 mb-20"
                />
              </a>
            </Link>

            {errorStatus && (
              <div className="my-5">
                <small className="text-red-400">{errorText}</small>
              </div>
            )}

            <form
              className="flex flex-col items-center w-full"
              onSubmit={onSubmit}>
              <div className="w-full mb-7">
                <label
                  htmlFor="email"
                  className="flex items-center space-x-2 mb-1 font-medium text-sm">
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

              <div className="input w-full mb-3">
                <label
                  htmlFor="password"
                  className="flex items-center space-x-2 font-medium text-sm">
                  <img src="/icons/001-user.svg" className="w-4" />
                  <span>Wachtwoord*</span>
                </label>
                <input
                  type={revealPassword ? "text" : "password"}
                  name="password"
                  className={inputClasses}
                  onChange={(evt) => {
                    setPassword(evt.target.value);
                  }}
                />
                {revealPassword ? (
                  <FaEyeSlash
                    className="login-reveal text-green-700"
                    onClick={changePasswordReveal}
                  />
                ) : (
                  <FaEye
                    className="login-reveal text-green-700"
                    onClick={changePasswordReveal}
                  />
                )}
              </div>

              <div className="flex justify-between text-xs w-full mb-7">
                <div className="flex items-center space-x-1.5">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    className="border-primary accent-primary focus:accent-primary text-white"
                  />

                  <label htmlFor="rememberMe">Onthoud wachtwoord</label>
                </div>

                <Link href="/forgot-password">
                  <p className="text-gray-500 cursor-pointer">
                    Wachtwoord vergeten?
                  </p>
                </Link>
              </div>

              {submitting ? (
                <div className="bg-tertiary mb-3 text-white flex flex-row justify-center font-light px-4 py-3 w-full rounded-md capitalize">
                  <RegisterLoadingSpinner />
                </div>
              ) : (
                <button className="bg-tertiary mb-3 text-white text-center content-center font-light px-4 py-3 w-full rounded-md capitalize">
                  login
                </button>
              )}

              <div className="flex flex-row justify-end text-xs font-light w-full">
                <p>
                  Nog geen account?{" "}
                  <Link href="/register">
                    <a className="text-primary">Registreer</a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
