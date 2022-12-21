import { fetchArchive, getHouseInviteData } from "../../lib/house";
import { useEffect } from "react";
import { fetchUser } from "../../lib/auth";
import { getDocuments } from "../../lib/documents";
import LetterLayout from "../../components/Layouts/LetterLayout";
import ProfileBanner from "../../components/Banners/ProfileBanner";

export async function getServerSideProps(context) {
  let houseWithLetters = [];
  let documents = [];
  let documentsRes = await getDocuments(context.req);

  if (documentsRes.success) {
    documents = documentsRes.data.groups;
  }

  let archive = await fetchArchive(context.req);
  let userRes = await fetchUser(context.req);
  let user = null;
  if (userRes?.data) {
    user = userRes.data;
  } else {
  }

  setLetters();
  const [_houseWithLetters, houseInvites] = await getLetters();

  async function getLetters() {
    let houseInvites = [];
    for (let i = 0; i < houseWithLetters.length; i++) {
      for (let j = 0; j < houseWithLetters[i].letters.length; j++) {
        let letter_id = houseWithLetters[i].letters[j].id;
        let letterData = await getHouseInviteData(context.req, letter_id);
        if (letterData) {
          let letter = houseWithLetters[i].letters[j];
          letter = {
            ...letter,
            letterData: letterData,
          };
          houseWithLetters[i].letters[j] = letter;
          if (!letterData.optionDetails.isTooLate) {
            let house = houseWithLetters[i];
            house = {
              ...house,
              hasInvite: true,
              letter,
            };
            houseInvites.push(house);
            break;
          }
        }
      }
      if (houseInvites.length > 0) {
        break;
      }
    }
    return [houseWithLetters, houseInvites];
  }

  function setLetters() {
    getLettersFromArchive(archive.inProgress);
    getLettersFromArchive(archive.onSite);
  }

  function getLettersFromArchive(archiveItems) {
    for (let i = 0; i < archiveItems.length; i++) {
      if (archiveItems[i].letters?.length > 0) {
        houseWithLetters.push(archiveItems[i]);
      }
    }
  }

  return {
    props: { archive, documents, houseWithLetters, houseInvites, user },
  };
}

const Letter: React.FC<any> = ({ archive, houseInvites, user, documents }) => {
  useEffect(() => {
    console.log("documents", documents);
    console.log("houseInvites", houseInvites);
  }, []);

  return (
    <LetterLayout title="Letter" footerBanner={<ProfileBanner />}>
      <div className="bg-gr bg-gradient-to-r from-tertiary to-primary rounded-tr-[200px] rounded-bl-[200px] ">
        <div className="container relative text-white py-16">
          <h1 className=" drop-shadow-lg font-bold text-80">
            Congratulations René!
          </h1>
          <h2 className="text-2xl mt-2 mb-10">
            You have been offered house X, This is your final offer letter
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
          Lorem ipsum is the short-hand term for the most popular placeholder
          text in history, used for decades by graphic designers, web
          developers, and the publishing industry. Here’s what a paragraph of
          lorem ipsum looks like: Lorem Ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem
          ipsum is the short-hand term for the most popular placeholder text in
          history, used for decades by graphic designers, web developers, and
          the publishing industry. Here’s what a paragraph of lorem ipsum looks
          like: Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum is the short-hand term for the most popular placeholder
          text in history, used for decades by graphic designers, web
          developers, and the publishing industry. Here’s what a paragraph of
          lorem ipsum looks like: Lorem Ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem
          ipsum is the short-hand term for the most popular placeholder text in
          history, used for decades by graphic designers, web developers, and
          the publishing industry. Here’s what a paragraph of lorem ipsum looks
          like: Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
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
  );
};

export default Letter;
