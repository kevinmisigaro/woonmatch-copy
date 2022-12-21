import { useState, useEffect } from "react";
import NewsLetterBanner from "../components/Banners/NewsletterBanner";
import Layout from "../components/Layouts/SiteLayout";

const PrivacyPage: React.FC<any> = () => {
  return (
    <Layout title="Privacy en disclaimer" footerBanner={<NewsLetterBanner />}>
      <div>
        <div className="container mx-auto px-4 md:px-32 py-24 lg:py-16 text-fuscous-gray-500 text-base lg:text-lg">
          <h2 className="font-semibold text-xl md:text-2xl 2xl:text-4xl text-limeade mb-10">
            Privacyverklaring & Disclaimer
          </h2>

          <div className="flex flex-col gap-y-14 text-justify">
            <div className="flex flex-row items-center border-b border-gray-200 pb-9">
              <div className="basis-1/5">
                <div className="rounded-full bg-gray-200 h-32 w-32 relative">
                  <img
                    src="/privacy/boxes.svg"
                    className="w-16 absolute top-8 left-8"
                  />
                </div>
              </div>
              <div className="basis-4/5">
                <h2 className="text-base font-normal mb-5">
                  Uitsluiting van aansprakelijkheid
                </h2>
                <p className="text-gray-500 font-light">
                  Aan de informatie op deze website kunnen geen rechten worden
                  ontleend. Wij spannen ons in om de informatie op deze website
                  zo volledig en nauwkeurig mogelijk te laten zijn, wijzigingen
                  en typefouten voorbehouden. Woonmatch en de samenwerkende
                  Corporaties aanvaarden geen enkele verantwoordelijkheid voor
                  schade op welke manier dan ook ontstaan door gebruik,
                  onvolledigheid of onjuistheid van de aangeboden informatie op
                  deze website.
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center border-b border-gray-200 pb-9">
              <div className="basis-1/5">
                <div className="rounded-full bg-gray-200 h-32 w-32 relative">
                  <img
                    src="/privacy/curvedarrow.svg"
                    className="w-16 absolute top-8 left-8"
                  />
                </div>
              </div>
              <div className="basis-4/5">
                <h2 className="text-base font-normal mb-5">Beschikbaarheid</h2>
                <p className="text-gray-500 font-light">
                  De informatie en aanbevelingen op deze website kunnen zonder
                  voorafgaande waarschuwing of kennisgeving worden gewijzigd. We
                  spannen ons in om deze website zo veel mogelijk beschikbaar te
                  stellen, maar wij aanvaarden geen enkele aansprakelijkheid
                  voor eventuele gevolgen van (tijdelijke) niet-beschikbaarheid.
                </p>
              </div>
            </div>

            <div className="flex flex-row items-start border-b border-gray-200 pb-9">
              <div className="basis-1/5">
                <div className="rounded-full bg-gray-200 h-32 w-32 relative">
                  <img
                    src="/privacy/shield.svg"
                    className="w-16 absolute top-8 left-8"
                  />
                </div>
              </div>
              <div className="basis-4/5">
                <h2 className="text-base font-normal mb-5">Privacy</h2>
                <p className="text-gray-500 font-light">
                  Als u zich inschrijft als woningzoekende en via Woonmatch een
                  woning zoekt, dan verstrekt u persoonlijke gegevens en
                  documenten. Deze gegevens zijn noodzakelijk voor het matchen
                  aan en het toewijzen van woningen. Wij gaan hier zorgvuldig,
                  veilig en vertrouwelijk mee om. Verwerking van
                  persoonsgegevens vindt plaats onder naleving van de
                  voorwaarden zoals vermeld in de geldende en relevante wet- en
                  regelgeving ten aanzien van Persoonsgegevens (thans de AVG).
                  <br />
                  <br />
                  Uw persoonsgegevens worden alleen gebruikt voor doeleinden die
                  hieronder genoemd worden. Uw persoonsgegevens worden niet
                  langer bewaard dan nodig is voor deze doeleinden, en maximaal
                  1 jaar na uw uitschrijving verwijderd uit onze systemen.
                  <br />
                  <br />
                  Als u documenten uploadt ten behoeve van een woningtoewijzing
                  kunt u deze zelf te allen tijde beheren en verwijderen,
                  behalve wanneer deze documenten onderdeel uitmaken van een
                  woningtoewijzingsprocedure. Bij uitschrijving worden alle door
                  u geüploade documenten direct verwijderd uit Woonmatch .
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
              <div className="basis-1/5">
                <div className="rounded-full bg-gray-200 h-32 w-32 relative">
                  <img
                    src="/privacy/document.svg"
                    className="w-16 absolute top-6 left-8"
                  />
                </div>
              </div>
              <div className="basis-4/5">
                <h2 className="text-base font-normal mb-5">Doeleinden</h2>
                <p className="text-gray-500 font-light">
                  Het primaire doel van de website Woonmatch is de bemiddeling
                  van woonruimte van de samenwerkende woningcorporaties,
                  gemeentelijke woningbedrijven en organisaties: De Woonschakel,
                  Het Grootslag, Intermaris, Koggenland, Mooiland, Opmeer,
                  Welwonen, Wooncompagnie en Woonzorg, in dit privacystatement
                  omschreven als ‘de samenwerkende Corporaties' in de regio.
                  Onder deze bemiddeling wordt verstaan het gehele proces vanaf
                  het inschrijven als woningzoekende tot aan het koppelen van
                  een woning aan uw gegevens ná toewijzing. Dit proces bevat
                  elementen als het reageren op woonruimte, het aanbieden van
                  woonruimte door de samenwerkende Corporaties en het
                  beantwoorden van vragen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
