import React, { useRef, useState } from "react";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import Layout from "../../components/Layouts/PlainLayout";
import { useRouter } from "next/router";
import { RegisterPopUp } from "../../components/Registration/RegisterPopUp";
import moment from "moment";
import Link from "next/link";
import RegistrationDob from "../../components/Registration/RegistrationDob";
import { RegisterLoadingSpinner } from "../../components/Registration/LoadingSpinner";

const RegisterPage: React.FC<any> = () => {
  const [confirmEmailAge, setConfirmEmailAge] = useState<boolean>(false);
  const [confirmPrivacy, setConfirmPrivacy] = useState<boolean>(false);
  const [revealPasswordConfirm, setRevealPasswordConfirm] =
    useState<boolean>(false);
  const [revealPassword, setRevealPassword] = useState<boolean>(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showError, setShowError] = useState(false);

  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

  const changePasswordConfirmReveal = () => {
    setRevealPasswordConfirm(!revealPasswordConfirm);
  };

  const changePasswordReveal = () => {
    setRevealPassword(!revealPassword);
  };

  const [values, setValues] = useState({
    email: "",
    dob: "",
    password: "",
    day: "01",
    month: "01",
    year: "1991",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState({
    errorExists: false,
    errorText: "",
  });
  const [dobError, setDobError] = useState({
    errorExists: false,
    errorText: "",
  });
  const [passwordError, setPasswordError] = useState({
    errorExists: false,
    errorText: "",
  });
  const [apiError, setApiError] = useState({
    errorExists: false,
    errorText: "",
  });

  const handleEmailChange = (e) => {
    e.persist();
    setValues({
      ...values,
      email: e.target.value,
    });
  };

  const handleDobChange = (e) => {
    e.persist();
    setValues({
      ...values,
      dob: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    e.persist();
    setValues({
      ...values,
      password: e.target.value,
      dob: `${
        values.day.charAt(0) === "0" ? values.day.substring(1) : values.day
      }-${
        values.month.charAt(0) === "0"
          ? values.month.substring(1)
          : values.month
      }-${values.year}`,
    });
  };

  const handlePasswordConfirmChange = (e) => {
    e.persist();
    setValues({
      ...values,
      confirmPassword: e.target.value,
      dob: `${
        values.day.charAt(0) === "0" ? values.day.substring(1) : values.day
      }-${
        values.month.charAt(0) === "0"
          ? values.month.substring(1)
          : values.month
      }-${values.year}`,
    });
  };

  const submitPrivacy = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/auth/privacy", options);

    const json_response = await response.json();

    if (json_response.success) {
      setConfirmPrivacy(false);
      router.push("/register/why");
    } else {
      console.log(json_response.message);
    }
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();

    console.log(values);

    //initial phase
    setEmailError({
      errorText: "",
      errorExists: false,
    });

    setApiError({
      errorText: "",
      errorExists: false,
    });

    setDobError({
      errorText: "",
      errorExists: false,
    });

    setPasswordError({
      errorText: "",
      errorExists: false,
    });

    //check on empty string
    if (values.email == "") {
      setEmailError({
        errorText: "Email ontbreekt",
        errorExists: true,
      });
    }

    if (values.dob == "") {
      setDobError({
        errorText: "Deboortedatum ontbreekt",
        errorExists: true,
      });
    }

    if (values.password == "") {
      setPasswordError({
        errorText: "Wachtwoord ontbreekt",
        errorExists: true,
      });
    }

    //check if password and confirm password are the same
    if (values.password !== values.confirmPassword) {
      setPasswordError({
        errorText: "Wachtwoord en bevestigd wachtwoord komen niet overeen",
        errorExists: true,
      });
    }

    //check if user is greater than or equal to 18 years old
    let a = moment(values.dob);
    let b = moment();
    if (b.diff(a, "years") <= 18) {
      setDobError({
        errorText: "Moet minimaal 18 jaar oud zijn",
        errorExists: true,
      });
    }

    setConfirmEmailAge(true);
  };

  const handleConfirmEmailPopUp = async () => {
    setConfirmEmailAge(false);
    setLoading(true);
    setErrors([]);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        passthrough: "false",
        password: values.password,
        dob: `${
          values.day.charAt(0) === "0" ? values.day.substring(1) : values.day
        }-${
          values.month.charAt(0) === "0"
            ? values.month.substring(1)
            : values.month
        }-${values.year}`,
        email: values.email,
      }),
    };

    const response = await fetch("/api/auth/register", options);
    const jsonResponse = await response.json();

    if (jsonResponse.success) {
      setLoading(false);
      setConfirmPrivacy(true);
    } else {
      setLoading(false);
      console.log(jsonResponse);

      if (jsonResponse.data == undefined) {
        setErrors([...jsonResponse.data.errors]);
        setShowError(true);
      } else {
        setErrors([...jsonResponse.data.errors]);
        setShowError(true);

        setApiError({
          errorExists: true,
          errorText: jsonResponse.data.response,
        });
      }
    }
  };

  const dayOnChange = (e) => {
    e.persist();
    setValues({
      ...values,
      day: e.target.value,
    });
  };

  const monthOnChange = (e) => {
    e.persist();
    setValues({
      ...values,
      month: e.target.value,
    });
  };

  const yearOnChange = (e) => {
    e.persist();
    setValues({
      ...values,
      year: e.target.value,
    });
  };

  const inputClasses: string =
    "border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-5/6 py-1";

  return (
    <Layout title="Register">
      <div className="flex flex-row w-full z-0">
        <div className="md:basis-1/4 bg-register"></div>
        <div className="md:basis-3/4 bg-red-200">
          <div className="bg-gradient-to-r from-tertiary to-primary py-3">
            <img
              src="images/logo-white.svg"
              alt="image"
              className="w-40 lg:w-64 pl-12 h-auto mt-8 pt-5 lg:mt-0 mb-8"
            />
          </div>
          <div className="w-full bg-white bg-rings h-screen rounded-md py-10 px-4 md:px-8 xl:px-16">
            <h2
              className="text-xl lg:text-3xl font-medium mb-4"
              onClick={() => setConfirmPrivacy(true)}>
              Regel uw inschrijving
            </h2>

            <p className="mb-10 font-thin">
              Nog niet ingeschreven bij Woonmatch? Meld u dan nu aan als
              woningzoekende! <br /> Inschrijven bij Woonmatch is gratis. Wilt u
              zich samen met uw partner <br /> inschrijven? Houd dan het
              e-mailadres van uw partner bij de hand.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-24">
              <form
                className="space-y-8 w-full 2xl:w-10/12"
                onSubmit={onSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="flex items-center space-x-2 mb-1 font-medium text-sm">
                    <img src="/icons/gmail.svg" className="w-4" />
                    <span>E-mailadres*</span>
                  </label>
                  <div className="relative">
                    {values.email
                      .toLowerCase()
                      .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      ) && (
                      <FaCheck className="absolute bottom-1 right-20 text-tertiary" />
                    )}
                    <input
                      type="email"
                      onChange={handleEmailChange}
                      value={values.email}
                      className={inputClasses}
                    />
                  </div>
                  {emailError.errorExists && (
                    <small className="text-red-400 text-xs font-light">
                      {emailError.errorText}
                    </small>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="dob"
                    className="flex items-center space-x-2 mb-1 font-medium text-sm">
                    <img src="/icons/002-calendar.svg" className="w-4" />
                    <span>Geboortedatum*</span>
                  </label>
                  <RegistrationDob
                    day={values.day}
                    month={values.month}
                    year={values.year}
                    dayOnChange={dayOnChange}
                    monthOnChange={monthOnChange}
                    yearOnChange={yearOnChange}
                  />
                  {dobError.errorExists && (
                    <small className="text-red-400 text-xs font-light">
                      {dobError.errorText}
                    </small>
                  )}
                </div>

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="flex items-center space-x-2 font-medium text-sm">
                    <img src="/icons/001-user.svg" className="w-4" />
                    <span>Wachtwoord*</span>
                  </label>
                  <div className="relative">
                    <input
                      ref={passwordInput}
                      type={revealPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handlePasswordChange}
                      className={inputClasses}
                    />

                    {revealPassword ? (
                      <div className="absolute right-20 bottom-2">
                        <FaEyeSlash
                          className="text-green-700"
                          onClick={changePasswordReveal}
                        />
                      </div>
                    ) : (
                      <div className="absolute right-20 bottom-2">
                        <FaEye
                          className="text-green-700"
                          onClick={changePasswordReveal}
                        />
                      </div>
                    )}
                  </div>
                  {passwordError.errorExists && (
                    <small className="text-red-400 text-xs font-light">
                      {passwordError.errorText}
                    </small>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="repeatePassword"
                    className="flex items-center space-x-2 font-medium text-sm">
                    <img src="/icons/001-user.svg" className="w-4" />
                    <span>Wachtwoord bevestigen*</span>
                  </label>
                  <div className="relative">
                    <input
                      ref={confirmPasswordInput}
                      type={revealPasswordConfirm ? "text" : "password"}
                      value={values.confirmPassword}
                      onChange={handlePasswordConfirmChange}
                      className={inputClasses}
                    />
                    {revealPasswordConfirm ? (
                      <div className="absolute right-20 bottom-2">
                        <FaEyeSlash
                          className="text-green-700"
                          onClick={changePasswordConfirmReveal}
                        />
                      </div>
                    ) : (
                      <div className="absolute right-20 bottom-2">
                        <FaEye
                          className="text-green-700"
                          onClick={changePasswordConfirmReveal}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {loading ? (
                  <div className="w-5/6 bg-tertiary flex flex-row justify-center text-white px-4 py-3 rounded-md">
                    <RegisterLoadingSpinner />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-5/6 bg-tertiary text-white px-4 py-3 rounded-md">
                    Maak account aan
                  </button>
                )}

                {apiError.errorExists && (
                  <div className="mb-5">
                    <span className="text-red-400">{apiError.errorText}</span>
                    <Link href="/login">
                      <span className="text-primary underline pl-2">
                        Hier inloggen
                      </span>
                    </Link>
                  </div>
                )}
              </form>

              <section className="space-y-10 w-full">
                <div className="flex items-center space-x-4">
                  <img src="/icons/responsive-design.svg" className="w-8" />
                  <p className="text-base">
                    Inloggen vanaf{" "}
                    <span className="font-medium">PC, laptop of telefoon</span>
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <img src="/icons/login.svg" className="w-8" />
                  <p className="text-base">
                    Eenvoudig{" "}
                    <span className="font-medium">samen inschrijven</span>
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <img src="/icons/get-money.svg" className="w-8" />
                  <p className="text-base">
                    Houd uw{" "}
                    <span className="font-medium">inkomen bij de hand</span>
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <img src="/icons/credit-cards.svg" className="w-8" />
                  <p className="text-base">
                    Bankpas niet nodig!{" "}
                    <span className="font-medium">
                      Uw inschrijving is gratis
                    </span>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {typeof window !== "undefined" &&
        window.document.activeElement === passwordInput.current && (
          <div className="px-6 py-4 z-50 absolute left-2/4 bottom-1/4 max-w-md min-h-max border border-red-300 shadow-lg shadow-red-300 bg-white">
            <p className="font-semibold text-base">Uw wachtwoord</p>
            <ul className="text-sm mt-2 list-disc list-inside">
              <li className={`${values.password.length > 8 && "line-through"}`}>
                Minimaal 8 tekens
              </li>
              <li className={`${/\d/.test(values.password) && "line-through"}`}>
                Bevat minimaal 1 cijfer
              </li>
              <li
                className={`${
                  values.password !== values.password.toLowerCase() &&
                  "line-through"
                }`}>
                Bevat minimaal 1 hoofdletter
              </li>
              <li
                className={`${
                  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
                    values.password
                  ) && "line-through"
                }`}>
                Bevat minimaal 1 leesteken
              </li>
            </ul>
          </div>
        )}

      {typeof window !== "undefined" &&
        window.document.activeElement === confirmPasswordInput.current && (
          <div className="px-6 py-4 z-50 absolute left-2/4 top-3/4 max-w-md min-h-max border border-red-300 shadow-lg shadow-red-300 bg-white">
            <p
              className={`${
                values.password == values.confirmPassword &&
                values.confirmPassword.length > 0 &&
                "line-through"
              }`}>
              Wachtwoorden zijn gelijk{" "}
            </p>
          </div>
        )}

      {/* Email and Age Confirmation */}
      <RegisterPopUp
        title="Voor de zekerheid"
        show={confirmEmailAge}
        onClose={() => setConfirmEmailAge(false)}>
        <div className="px-10 my-10">
          <p className="mb-4 font-light text-gray-500">
            Met deze gegevens gaat u zich nu inschrijven.
          </p>

          <p className="mb-12 font-light text-gray-500">
            <span className="font-medium pr-1">Let op:</span>U kunt uw geboortedatum later niet meer aanpassen. Vul uw gegevens dus goed in.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-24">
            <p className="text-lg font-light text-primary">
              Schrijf u in als woningzoekende
            </p>

            <div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="flex items-center space-x-2 mb-1 font-medium text-sm">
                  <img src="/icons/gmail.svg" className="w-4" />
                  <span>E-mailadres*</span>
                </label>
                <input
                  type="email"
                  value={values.email}
                  onChange={handleEmailChange}
                  className={inputClasses}
                />
              </div>

              <div className="mb-10">
                <label
                  htmlFor="dob"
                  className="flex items-center space-x-2 mb-1 font-medium text-sm">
                  <img src="/icons/002-calendar.svg" className="w-4" />
                  <span>Geboortedatum*</span>
                </label>
                <input
                  value={values.dob}
                  onChange={handleDobChange}
                  className={inputClasses}
                />
              </div>
              <p className="text-base font-light py-5">
                Zijn dit uw gegevens en zijn ze goed ingevuld?
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <button
            className="py-4 px-4 text-primary hover:text-primary bg-transparent border-t border-primary w-full"
            onClick={() => setConfirmEmailAge(false)}>
            Nee,deze gegevens kloppen niet
          </button>

          <button
            className="text-center py-4  text-white bg-apple border-t border-tertiary"
            onClick={handleConfirmEmailPopUp}>
            Dit zijn mijn gegevens
          </button>
        </div>
      </RegisterPopUp>

      {/* Errors */}
      <RegisterPopUp
        show={showError}
        onClose={() => setShowError(false)}
        title="Let op!">
        <div className="px-10 py-5 h-72">
          <ul className="list-disc">
            {errors.map((e, i) => (
              <li key={i}>{e.text}</li>
            ))}
          </ul>
        </div>
      </RegisterPopUp>

      {/* Privacy Confirmation */}
      <RegisterPopUp
        title="Privacyverklaring & Disclaimer"
        show={confirmPrivacy}
        onClose={() => setConfirmPrivacy(false)}>
        <div className="space-y-8 px-8 md:px-16 my-10 h-96 overflow-y-auto text-justify">
          <div className="flex flex-row items-center border-b border-gray-200 pb-9">
            <div className="basis-1/4">
              <div className="rounded-full bg-gray-200 h-32 w-32 relative">
                <img
                  src="/privacy/boxes.svg"
                  className="w-16 absolute top-8 left-8"
                />
              </div>
            </div>
            <div className="basis-3/4">
              <h2 className="text-base font-normal mb-5">
                Uitsluiting van aansprakelijkheid
              </h2>
              <p className="text-gray-500 font-light">
                Aan de informatie op deze website kunnen geen rechten worden
                ontleend. Wij spannen ons in om de informatie op deze website zo
                volledig en nauwkeurig mogelijk te laten zijn, wijzigingen en
                typefouten voorbehouden. Woonmatch en de samenwerkende
                Corporaties aanvaarden geen enkele verantwoordelijkheid voor
                schade op welke manier dan ook ontstaan door gebruik,
                onvolledigheid of onjuistheid van de aangeboden informatie op
                deze website.
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center border-b border-gray-200 pb-9">
            <div className="basis-1/4">
              <div className="rounded-full bg-gray-200 h-32 w-32 relative">
                <img
                  src="/privacy/curvedarrow.svg"
                  className="w-16 absolute top-8 left-8"
                />
              </div>
            </div>
            <div className="basis-3/4">
              <h2 className="text-base font-normal mb-5">Beschikbaarheid</h2>
              <p className="text-gray-500 font-light">
                De informatie en aanbevelingen op deze website kunnen zonder
                voorafgaande waarschuwing of kennisgeving worden gewijzigd. We
                spannen ons in om deze website zo veel mogelijk beschikbaar te
                stellen, maar wij aanvaarden geen enkele aansprakelijkheid voor
                eventuele gevolgen van (tijdelijke) niet-beschikbaarheid.
              </p>
            </div>
          </div>

          <div className="flex flex-row items-start border-b border-gray-200 pb-9">
            <div className="basis-1/4">
              <div className="rounded-full bg-gray-200 h-32 w-32 relative">
                <img
                  src="/privacy/shield.svg"
                  className="w-16 absolute top-8 left-8"
                />
              </div>
            </div>
            <div className="basis-3/4">
              <h2 className="text-base font-normal mb-5">Privacy</h2>
              <p className="text-gray-500 font-light">
                Als u zich inschrijft als woningzoekende en via Woonmatch een
                woning zoekt, dan verstrekt u persoonlijke gegevens en
                documenten. Deze gegevens zijn noodzakelijk voor het matchen aan
                en het toewijzen van woningen. Wij gaan hier zorgvuldig, veilig
                en vertrouwelijk mee om. Verwerking van persoonsgegevens vindt
                plaats onder naleving van de voorwaarden zoals vermeld in de
                geldende en relevante wet- en regelgeving ten aanzien van
                Persoonsgegevens (thans de AVG).
                <br />
                <br />
                Uw persoonsgegevens worden alleen gebruikt voor doeleinden die
                hieronder genoemd worden. Uw persoonsgegevens worden niet langer
                bewaard dan nodig is voor deze doeleinden, en maximaal 1 jaar na
                uw uitschrijving verwijderd uit onze systemen.
                <br />
                <br />
                Als u documenten uploadt ten behoeve van een woningtoewijzing
                kunt u deze zelf te allen tijde beheren en verwijderen, behalve
                wanneer deze documenten onderdeel uitmaken van een
                woningtoewijzingsprocedure. Bij uitschrijving worden alle door u
                geüploade documenten direct verwijderd uit Woonmatch .
                <br />
                <br />
                Met het opgeven van uw persoonlijke gegevens verleent u
                automatisch toestemming om deze persoonlijke gegevens te
                verwerken. Deze gegevens kunnen, ter ondersteuning van onze
                bedrijfsvoering, gedeeld worden met andere instellingen.
              </p>
            </div>
          </div>

          <div className="flex flex-row items-start pb-9">
            <div className="basis-1/4">
              <div className="rounded-full bg-gray-200 h-32 w-32 relative">
                <img
                  src="/privacy/document.svg"
                  className="w-16 absolute top-6 left-8"
                />
              </div>
            </div>
            <div className="basis-3/4">
              <h2 className="text-base font-normal mb-5">Doeleinden</h2>
              <p className="text-gray-500 font-light">
                Het primaire doel van de website Woonmatch is de bemiddeling van
                woonruimte van de samenwerkende woningcorporaties, gemeentelijke
                woningbedrijven en organisaties: De Woonschakel, Het Grootslag,
                Intermaris, Koggenland, Mooiland, Opmeer, Welwonen,
                Wooncompagnie en Woonzorg, in dit privacystatement omschreven
                als ‘de samenwerkende Corporaties' in de regio. Onder deze
                bemiddeling wordt verstaan het gehele proces vanaf het
                inschrijven als woningzoekende tot aan het koppelen van een
                woning aan uw gegevens ná toewijzing. Dit proces bevat elementen
                als het reageren op woonruimte, het aanbieden van woonruimte
                door de samenwerkende Corporaties en het beantwoorden van
                vragen.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center justify-center">
          <button
            className="py-4 px-4 text-tertiary hover:text-tertiary bg-transparent border-t border-tertiary w-full md:w-1/2"
            onClick={() => setConfirmPrivacy(false)}>
            Niet akkoord
          </button>

          <button
            className="py-4 px-4 text-white bg-tertiary border-t border-tertiary w-full md:w-1/2"
            onClick={submitPrivacy}>
            Akoord met privacyverklaring
          </button>
        </div>
      </RegisterPopUp>
    </Layout>
  );
};

export default RegisterPage;
