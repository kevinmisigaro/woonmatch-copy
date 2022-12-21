import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/pro-regular-svg-icons";
import Link from "next/link";
import useUser from "../../lib/useUser";

type Props = {
  children?: ReactNode;
  title?: string;
  onRefSet: Function;
};

const NavigationBar = ({ onRefSet }: Props) => {
  const user = useUser();
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [showFaq, setShowFaq] = useState<boolean>(false);

  const right_nav_ref = useRef(null);

  useEffect(() => {
    onRefSet(right_nav_ref);
  }, [right_nav_ref]);

  return (
    <div>
      <div className="bg-white drop-shadow-lg">
        <div className="container mx-auto">
          <nav className="flex justify-between items-center py-2 text-gray-500 h-[55px] 3xl:h-[85px] font-medium">
            <div className="flex justify-center md:justify-start text-white font-extrabold">
              <Link href="/">
                <a className=" ">
                  <img
                    src="/images/logo-colored.svg"
                    className="h-[30px] 3xl:h-[48px] w-auto"
                  />
                </a>
              </Link>
            </div>
            <ul
              ref={right_nav_ref}
              className="hidden lg:flex justify-end items-center">
              <li
                className={`py-2 px-4 ${
                  router.pathname == "/" ? "text-primary" : ""
                }`}>
                <Link href="/">
                  <a className="hover:text-primary ">Home</a>
                </Link>
              </li>
              <li
                className={`py-2 px-2 ${
                  router.pathname == "/houses" ? "text-primary" : ""
                }`}>
                <Link href="/houses">
                  <a className="hover:text-primary">Woningaanbod</a>
                </Link>
              </li>
              <li className="py-2 px-2">
                <Link href="/informatie">
                  <a className="hover:text-primary ">Over ons</a>
                </Link>
              </li>

              <li className="py-2 pl-2 pr-4">
                <Link href="/contact">
                  <a className="hover:text-primary ">Contact</a>
                </Link>
              </li>

              <UserProfileLinks user={user} />

              <li className="py-2 px-4">
                <div
                  className="hover:text-primary cursor-pointer"
                  onClick={() => router.push("/faq")}>
                  <img src="/images/faq.png" className="h-[40px]  w-auto" />
                </div>
              </li>
            </ul>

            <div className="lg:hidden flex items-center">
              <UserProfileLinks isMobile user={user} />
              <div>
                <div
                  className="bg-tertiary grid place-content-center  w-10 h-10  px-2 py-0.5 rounded-sm focus:outline-none"
                  onMouseLeave={(evt) => setMobileMenu(false)}
                  onClick={(evt) => setMobileMenu(!mobileMenu)}>
                  {!mobileMenu && (
                    <FontAwesomeIcon className="text-white" icon={faBars} />
                  )}
                  {mobileMenu && (
                    <FontAwesomeIcon className="text-white" icon={faTimes} />
                  )}
                </div>

                {mobileMenu && (
                  <div>
                    <div className="bg-[red]  ">
                      <div className="fixed h-[100vh] pr-10 pl-5 pt-5 bottom-0 top-[55px] right-0   bg-white ">
                        <ul className="text-lg">
                          <li className="py-2 px-4">
                            <Link href="/">
                              <a
                                className="hover:text-primary"
                                onClick={() => setMobileMenu(false)}>
                                Home
                              </a>
                            </Link>
                          </li>

                          <li className="py-2 px-4">
                            <Link href="/houses">
                              <a
                                className="hover:text-primary"
                                onClick={() => setMobileMenu(false)}>
                                Zoeken
                              </a>
                            </Link>
                          </li>

                          <li className="py-2 px-4">
                            <Link href="/">
                              <a
                                className="hover:text-primary"
                                onClick={() => setMobileMenu(false)}>
                                Over ons
                              </a>
                            </Link>
                          </li>

                          {user == null ? (
                            <li className="py-2  flex divide-x-2 divide-gray-400">
                              <Link href="/login">
                                <a className="px-4 text-primary">Login</a>
                              </Link>

                              <Link href="/register">
                                <a className="px-2 text-primary">Inschrijven</a>
                              </Link>
                            </li>
                          ) : null}

                          <li className="py-2 px-4">
                            <Link href="/">
                              <a
                                className="hover:text-primary"
                                onClick={() => setMobileMenu(false)}>
                                FAQ
                              </a>
                            </Link>
                          </li>
                        </ul>

                        {/* <div className="px-4">
                          <h2 className="text-lg mb-4">Download de app</h2>
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Google_Play_Store_badge_FR.svg/1200px-Google_Play_Store_badge_FR.svg.png"
                            className="h-[30px] mb-2"
                          />
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1200px-Download_on_the_App_Store_Badge.svg.png"
                            className="h-[30px]"
                          />
                          <div className="flex space-x-4 mt-10">
                            <button className="py-2 px-6 bg-limeade rounded-md">
                              <FontAwesomeIcon
                                className="text-white"
                                icon={faFacebookF}
                                size="2x"
                              />
                            </button>
                            <button className="py-2 px-6 bg-limeade rounded-md">
                              <FontAwesomeIcon
                                className="text-white"
                                icon={faLinkedin}
                                size="2x"
                              />
                            </button>
                            <button className="py-2 px-4 bg-limeade rounded-md">
                              <FontAwesomeIcon
                                className="text-white"
                                icon={faTwitter}
                                size="2x"
                              />
                            </button>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

const UserProfileLinks = ({ isMobile = false, user }) => {
  const [userOptions, setUserOptions] = useState<boolean>(false);
  const [width, setWidth] = useState(200);
  const [isUserLooged, setIsUserLogged] = useState(false);
  const router = useRouter();

  const parentRef = useRef(null);

  const doOnWindowResize = () => {
    if (parentRef?.current) {
      setWidth(parentRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      doOnWindowResize();
    });
    doOnWindowResize();
  }, [parentRef?.current?.offsetWidth]);

  useEffect(() => {
    setIsUserLogged(user !== null);
  }, [user]);

  const handleLogOut = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/auth/logout", options);
    const json_response = await response.json();
    router.push("/");
    location.reload();
  };

  const LoggedOutLinks = () => {
    return (
      <>
        <Link href="/login">
          <a className="px-2 text-primary ">Login</a>
        </Link>

        <Link href="/register">
          <a className="px-2 text-primary ">Inschrijven</a>
        </Link>
      </>
    );
  };

  return (
    <>
      {!isMobile ? (
        <li
          ref={parentRef}
          className={`${
            isUserLooged ? " relative " : "py-2 flex divide-gray-400 divide-x-2"
          } cursor-pointer`}
          onMouseEnter={(evt) => setUserOptions(true)}
          onMouseLeave={(evt) => setUserOptions(false)}>
          {isUserLooged ? (
            <LoggedInLinks
              userOptions={userOptions}
              user={user}
              width={width}
              handleLogOut={handleLogOut}
            />
          ) : (
            <>
              <LoggedOutLinks />
            </>
          )}
        </li>
      ) : (
        <div
          onMouseEnter={(evt) => setUserOptions(true)}
          onMouseLeave={(evt) => setUserOptions(false)}>
          {user ? (
            <LoggedInLinks
              userOptions={userOptions}
              user={user}
              width={width}
              handleLogOut={handleLogOut}
            />
          ) : (
            <>
              <LoggedOutLinks />
            </>
          )}
        </div>
      )}
    </>
  );
};

const ProfileLink = ({ link, title, icon = null, onClick = undefined }) => {
  return (
    <Link href={link}>
      <a
        className="flex   items-center hover:font-bold transition-all space-x-1 py-[5px] xl:py-[8px] 3xl:py-[10px] px-[10px] xl:px-[15px] 3xl:px-[20px]"
        onClick={() => {
          onClick ? onClick() : null;
        }}>
        {icon && (
          <div className="w-[20px] aspect-square flex items-center">
            <img src={icon} className="h-[10px] 3xl:h-auto" />
          </div>
        )}
        <div>{title}</div>
      </a>
    </Link>
  );
};

const LoggedInLinks = ({ userOptions, user, width, handleLogOut }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center ">
          <img
            src="/images/profile_picture_placeholder.svg"
            className=" w-[30px]  lg:xl:w-[22px] 3xl:w-[30px] aspect-square rounded-full border-2  overflow-hidden border-primary"
          />

          <div className="hidden  lg:block lg:max-w-[120px] xl:max-w-[180px] 3xl:max-w-[280px] truncate text-primary ml-1 ">
            {user.initials}&nbsp;{user.lastname}
          </div>
        </div>
        <div className="ml-2 mr-2">
          <img
            style={{
              transform: userOptions ? `rotateX(180deg)` : `rotateX(0deg)`,
            }}
            src="/images/caret_down.svg"
            className="h-auto w-[11px] 3xl:w-[15px] duration-500"
          />
        </div>
      </div>
      {userOptions && (
        <div className="absolute !w-[300px] py-2 z-20 right-[52px] top-[50px] lg:top-auto lg:right-auto  lg:left-auto border-none rounded-[5px] bg-gradient-to-r from-tertiary to-primary text-gray-100 text-sm font-normal">
          <div className="lg:hidden text-white ml-1 font text-lg p-3 border-b-2 border-primary">
            {user.initials}&nbsp;{user.lastname}
          </div>
          <ul className="w-[300px]">
            <li>
              <ProfileLink
                link="/points"
                title="Mijn punten"
                icon="/images/points.svg"
              />
            </li>
            <li>
              <ProfileLink
                link="/profile"
                title="Mijn profiel"
                icon="/images/profile-icon.svg"
              />
            </li>
            <li>
              <ProfileLink
                link="/documents"
                title="Mijn documenten"
                icon="/images/documents.svg"
              />
            </li>
            <li>
              <ProfileLink
                link="/react"
                title="Mijn reacties"
                icon="/images/reactions.svg"
              />
            </li>
            <li>
              <ProfileLink
                link="/house-swap"
                title="Ruil mijn woning"
                icon="/images/exchange.svg"
              />
            </li>
            <li>
              <ProfileLink
                link="/letters"
                title="Mijn berichten"
                icon="/images/letter.svg"
              />
            </li>
            <li>
              <ProfileLink onClick={handleLogOut} link="/" title="Log uit" />
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export const NavigationMessageDrawer = ({ message, right_nav_ref }) => {
  const [isOpen, setIsOpen] = useState(false);
  const message_containerWidth = 340;
  const initialTopPosition = 55;
  const default_closed_height = 30;
  const [messageContainerHeight, setContainerHeight] = useState(
    default_closed_height
  );
  const [messageTopPostion, setMessageTopPosition] =
    useState(initialTopPosition);
  const [messageOpacity, setMessageOpacity] = useState(0);
  const [drawerButtonOpacity, setDrawerButtonOpacity] = useState(1);

  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  const doOnWindowResize = () => {
    if (right_nav_ref != null) {
      setLeft(
        right_nav_ref.current.offsetLeft +
          (right_nav_ref.current.offsetWidth - message_containerWidth) / 2
      );
      setTop(right_nav_ref.current.offsetHeight);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", doOnWindowResize);
    doOnWindowResize();
    return () => {
      window.removeEventListener("resize", doOnWindowResize);
    };
  });

  useEffect(() => {
    if (isOpen) {
      setContainerHeight(120);
      setMessageOpacity(1);
      setMessageTopPosition(0);
      setDrawerButtonOpacity(0);
    } else {
      setContainerHeight(default_closed_height);
      setMessageOpacity(0);
      setMessageTopPosition(initialTopPosition);
      setDrawerButtonOpacity(1);
    }
  }, [isOpen]);

  return (
    <div
      style={{
        height: messageContainerHeight,
        width: message_containerWidth,
        transition: "height 500ms ease-in-out 0s",
        left: left,
        top: -2,
      }}
      className="absolute bg-gradient-to-r  from-tertiary to-primary rounded-br-md rounded-bl-md flex flex-col justify-between right-[100px]">
      {isOpen && (
        <div className="z-10 absolute text-right text-[20px] text-white right-[20px] top-[10px] ">
          <span
            className="cursor-pointer"
            onClick={() => {
              setIsOpen(false);
            }}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
      )}

      <div
        style={{
          height: messageContainerHeight,
          top: messageTopPostion,
          opacity: messageOpacity,
          transition: "all 250ms ease-in-out 0s",
        }}
        className="absolute text-white grid content-center  px-10 text-[20px] text-center left-0 right-0  ">
        {message}
      </div>
      <div
        style={{
          opacity: drawerButtonOpacity,
          transition: "opacity 250ms ease-in-out 0s",
        }}
        onClick={() => {
          setIsOpen(true);
        }}
        className="grid place-content-center cursor-pointer absolute bottom-0 left-0 right-0">
        <img
          src="/images/caret_down_white.svg"
          className="mb-1 h-auto w-[11px] 3xl:w-[20px]"
        />
      </div>
    </div>
  );
};

export default NavigationBar;
