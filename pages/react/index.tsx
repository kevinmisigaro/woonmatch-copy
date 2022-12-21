import Layout from "../../components/Layouts/SiteLayout";
import ReactedCard from "../../components/Cards/ReactedCard";
import { fetchArchive, getHouseInviteData } from "../../lib/house";
import { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { fetchUser } from "../../lib/auth";
import { getDocuments } from "../../lib/documents";
import HouseInviteBanner from "../../components/Banners/HouseInviteBanner";

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
    console.log("user not found");
  }

  setLetters(); //sets houseWithLetters

  const [_houseWithLetters, houseInvites] = await getLetters();

  let letters: any[] = [];

  async function getLetters() {
    let houseInvites = [];
    for (let i = 0; i < houseWithLetters.length; i++) {
      for (let j = 0; j < houseWithLetters[i].letters.length; j++) {
        let letter_id = houseWithLetters[i].letters[j].id;
        let letterData = await getHouseInviteData(context.req, letter_id);

        if (letterData?.advert?.reaction?.status.hasReacted == false) {
          let letter = houseWithLetters[i].letters[j];
          letter = {
            ...letter,
            letterData: letterData,
          };

          letters.push(letterData);

          houseWithLetters[i].letters[j] = letter;
          if (!letterData?.optionDetails?.isTooLate) {
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
    props: {
      letters,
      archive,
      documents,
      houseWithLetters,
      houseInvites,
      user,
    },
  };
}

const ReactionsPage: React.FC<any> = ({
  archive,
  houseInvites,
  user,
  documents,
  letters,
}) => {
  useEffect(() => {
    console.log("documents", documents);
    console.log("houseInvites", houseInvites);
    console.log("houseWithLetters", houseInvites);
    console.log("archive", archive);
    console.log("letters", letters);
  }, []);

  return (
    <Layout title="Overzicht Reacties">
      <div>
        {houseInvites.length > 0 && (
          <section>
            {houseInvites.map((houseInvite: any, index: number) => (
              <HouseInviteBanner
                key={index}
                houseInvite={houseInvite}
                letter={houseInvite.letter.letterData}
                user={user}
                documents={documents}
              />
            ))}
          </section>
        )}
        <section className="bg-fuscous-gray-100 ">
          <div className="relative container  py-10">
            <h2 className="font-semibold text-xl md:text-2xl 2xl:text-4xl text-primary mb-5">
              Reacties in behandeling corporatie
            </h2>
            {archive.inProgress?.length > 0 && (
              <p>
                De reactietermijn is gesloten. Als u in aanmerking komt,
                ontvangt een e-mail hierover. U kunt niet meer van de
                kandidatenlijst af zonder afbouw van zoek- of situatiepunten.
              </p>
            )}
            <div className="mt-6">
              {/* Reacted Houses List */}
              {archive.inProgress?.map((item, index) => (
                <ReactedCard
                  contentObject={item}
                  status={"offline"}
                  mini={false}
                  key={index}
                />
              ))}
            </div>
            {archive.inProgress?.length == 0 && (
              <div>Er zijn geen reacties voor u in behandeling</div>
            )}
          </div>
        </section>
        <section className="relative container mx-auto  py-10 space-y-5">
          <h2 className="font-semibold text-xl md:text-2xl 2xl:text-4xl text-primary mb-5">
            Advertenties online
          </h2>
          {archive.onSite?.length > 0 && (
            <p>
              Deze woningen staan op dit moment online op de website. Andere
              woningzoekenden kunnen nog reageren op deze woning.
            </p>
          )}

          {archive.onSite?.length == 0 && (
            <div>U heeft op dit moment niet gereageerd</div>
          )}

          <div className="mt-6">
            {/* Reacted Houses List */}
            {archive.onSite?.map((item, index) => (
              <ReactedCard
                contentObject={item}
                mini={false}
                reactionStatus={"online"}
                key={index}
              />
            ))}
          </div>
        </section>
        <hr />
        <section className="relative container mx-auto py-10 space-y-10">
          <h2 className="font-semibold text-xl md:text-2xl 2xl:text-4xl text-primary mb-10">
            Geschiedenis
          </h2>
          <p>Je hebt in het verleden op deze woningen gereageerd.</p>
          {archive.history?.length > 0 && (
            <ArchiveSlider items={archive.history} />
          )}
          {archive.history?.length == 0 && <div>Uw archief lijst is leeg</div>}
        </section>
      </div>
    </Layout>
  );
};

export const ArchiveSlider = ({ items }) => {
  const parentRef = useRef(null);
  const [viewportRef, embla] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  return (
    <div className="relative" ref={parentRef}>
      <div className="" ref={viewportRef}>
        <div className="embla__container">
          {items?.map((item, index) => (
            <ReactedCard
              parentRef={parentRef}
              contentObject={item}
              isArchive={true}
              key={index}
            />
          ))}
        </div>
      </div>
      <button
        className="absolute -right-[65px] sm:-right-[45px] scale-[20%] sm:scale-[30%]  lg:scale-[40%] 3xl:scale-100 -top-[35px] sm:top-[1%] md:top-[5%] lg:mt-[2%] 3xl:top-[22%] hover:pl-10 transition-all duration-500 w-[150px] h-[150px] z-10 grid place-content-center bg-tertiary rounded-full"
        onClick={scrollNext}>
        <img src="/images/arrow-right.svg" />
      </button>
    </div>
  );
};

export default ReactionsPage;
