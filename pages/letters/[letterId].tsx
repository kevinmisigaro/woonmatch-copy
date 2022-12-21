import { useEffect } from "react";
import LetterLayout from "../../components/Layouts/LetterLayout";
import ProfileBanner from "../../components/Banners/ProfileBanner";
import { getLetterData } from "../../lib/letters";
import { fetchArchive } from "../../lib/house";
import { fetchUser } from "../../lib/auth";
import { UserLetter } from ".";
import SiteLayout from "../../components/Layouts/SiteLayout";
import { getDocuments } from "../../lib/documents";
import HouseInviteBanner from "../../components/Banners/HouseInviteBanner";

export async function getServerSideProps(context: any) {
  let documents = [];
  let documentsRes = await getDocuments(context.req);

  if (documentsRes.success) {
    documents = documentsRes.data.groups;
  }

  let archive = await fetchArchive(context.req);
  const letter: UserLetter = await getLetterData(
    context.req,
    context.params.letterId
  );

  let userRes = await fetchUser(context.req);
  let user = null;
  if (userRes?.data) {
    user = userRes.data;
  }

  let archiveItems = ["inProgress", "onSite", "history"];

  let houseInvite = null;

  for (let j = 0; j < archiveItems.length; j++) {
    for (let i = 0; i < archive[archiveItems[j]].length; i++) {
      if (archive[archiveItems[j]][i].advert == letter?.advert.id) {
        houseInvite = archive[archiveItems[j]][i];
        break;
      }
    }
  }

  return { props: { letter, houseInvite, user, documents } };
}

const Letter: React.FC<any> = ({ letter, houseInvite, user, documents }) => {
  const letterType = letter?.type;
  houseInvite = {
    ...houseInvite,
    letter: {
      letterData: letter,
    },
  };
  useEffect(() => {
    console.log("user", user);
    console.log("houseInvite", houseInvite);
    console.log("letter", letter);
  }, []);

  return (
    <>
      {!letter && (
        <SiteLayout title="Letter not found" footerBanner={<ProfileBanner />}>
          <div className="container relative  py-16 text-center">
            <div className="text-red-400 font-bold">Letter not found!</div>
            <div className="mt-5">
              Click{" "}
              <a href="/letters" className="text-tertiary">
                here
              </a>{" "}
              to see available letters
            </div>
          </div>
        </SiteLayout>
      )}
      {letter && (
        <>
          {letterType != "final_offer" && ( //final_offer is jus a placeholder
            <SiteLayout title={letter.name} footerBanner={<ProfileBanner />}>
              {houseInvite?.advert && (
                <HouseInviteBanner
                  houseInvite={houseInvite}
                  letter={letter}
                  user={user}
                  documents={documents}
                />
              )}
              <section className="bg-white">
                <div className="relative container  py-10"></div>
              </section>
            </SiteLayout>
          )}

          {letterType == "final_offer" && ( //final_offer is jus a placeholder
            <LetterLayout title={letter.name} footerBanner={<ProfileBanner />}>
              <div className="bg-gr bg-gradient-to-r from-tertiary to-primary rounded-tr-[200px] rounded-bl-[200px] ">
                <div className="container relative text-white py-16">
                  <h1 className=" drop-shadow-lg font-bold text-80">
                    Congratulations René!
                  </h1>
                  <h2 className="text-2xl mt-2 mb-10">
                    You have been offered house X, This is your final offer
                    letter
                  </h2>
                  <img
                    src="/images/fireworks.png"
                    className="absolute -top-12 right-40 z-50 h-32"
                  />
                  <img
                    src="/images/applause.png"
                    className="absolute -bottom-10 -right-16 z-50 h-48"
                  />
                </div>
              </div>
              <div className="container font-light space-y-10 py-16">
                <p className="font-medium">Dear René</p>
                <p>
                  Lorem ipsum is the short-hand term for the most popular
                  placeholder text in history, used for decades by graphic
                  designers, web developers, and the publishing industry. Here’s
                  what a paragraph of lorem ipsum looks like: Lorem Ipsum dolor
                  sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id
                  est laborum. Lorem ipsum is the short-hand term for the most
                  popular placeholder text in history, used for decades by
                  graphic designers, web developers, and the publishing
                  industry. Here’s what a paragraph of lorem ipsum looks like:
                  Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <p>
                  Lorem ipsum is the short-hand term for the most popular
                  placeholder text in history, used for decades by graphic
                  designers, web developers, and the publishing industry. Here’s
                  what a paragraph of lorem ipsum looks like: Lorem Ipsum dolor
                  sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id
                  est laborum. Lorem ipsum is the short-hand term for the most
                  popular placeholder text in history, used for decades by
                  graphic designers, web developers, and the publishing
                  industry. Here’s what a paragraph of lorem ipsum looks like:
                  Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <div className=" mt-20 text-center">
                  <div className="m-auto w-[90%] flex flex-wrap md:flex-nowrap space-y-4 md:space-y-0 sm:space-x-2">
                    <button
                      className="button-outline w-full sm:w-1/2"
                      onClick={() => {}}>
                      Refuse the offer
                    </button>
                    <button
                      className="button-primary w-full sm:w-1/2"
                      onClick={() => {}}>
                      Accept the offer
                    </button>
                  </div>
                </div>
                <div className="h-20"></div>
              </div>
            </LetterLayout>
          )}
        </>
      )}
    </>
  );
};

export default Letter;
