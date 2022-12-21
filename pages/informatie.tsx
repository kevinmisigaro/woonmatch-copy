import NewsLetterBanner from "../components/Banners/NewsletterBanner";
import Layout from "../components/Layouts/SiteLayout";

const InformatiePage: React.FC<any> = () => (
  <Layout title="Informatie" footerBanner={<NewsLetterBanner />}>
    <div>
      <section className="bg-informatie px-4 md:px-16 xl:px-0 py-16 md:py-40 w-full">
        <div className="container mx-auto relative z-10">
          <div className="w-full md:w-1/2 xl:w-1/3 text-white space-y-8">
            <h2 className="font-semibold text-xl md:text-2xl 2xl:text-4xl">
              INFORMATIE
            </h2>

            <p className="text-sm md:text-base xl:text-lg">
              Via deze website vindt u het aanbod van huurwoningen in
              West-Friesland: de gemeenten Drechterland, Enkhuizen, Hoorn,
              Koggenland, Medemblik, Opmeer en Stede Broec. Het betreft vooral
              sociale huurwoningen (huur tot € 752,33), maar ook vrije sector
              huurwoningen van de woningcorporaties.
            </p>

            <p className="text-sm md:text-base xl:text-lg">
              Voor de woonruimtebemiddeling in West-Friesland werken de
              gemeentelijk woningbedrijven Koggenland en Opmeer en de
              woningcorporaties Het Grootslag, Intermaris, Welwonen,
              Wooncompagnie, De Woonschakel en Woonzorg samen onder de naam
              Woonmatch West-Friesland. Deze negen deelnemers bieden op deze
              website hun beschikbare woningen in de regio West-Friesland te
              huur aan.
            </p>

            <button className="bg-gradient-to-r from-limeade to-apple text-white lg:text-lg rounded-md p-4 xl:px-12">
              Zoek naar een woning
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-16 py-24 lg:py-16">
        <h2 className="font-semibold text-xl md:text-2xl 2xl:text-4xl text-limeade text-center mb-8">
          Reageren op woningen
        </h2>

        <p className="text-sm md:text-base xl:text-lg text-center text-gray-500">
          U kunt reageren op alle huurwoningen in de regio die passend zijn bij
          uw inkomen, leeftijd en gezinssamenstelling. Bij de ‘veel gestelde
          vragen’ kunt u zien welke woningen passend zijn voor u. Voor een
          schematisch overzicht klikt u hier. Elke dag worden er woningen
          geadverteerd. Deze staan 7 dagen op de website. Als u 1 keer per week
          kijkt, mist u niets
        </p>
      </section>

      <section className="text-gray-500">
        <div className="flex flex-wrap lg:flex-nowrap items-center bg-fuscous-gray-100">
          <div className="container mx-auto px-6 md:px-16 xl:px-24 py-24 lg:py-16 w-full lg:w-1/2">
            <h2 className="text-xl lg:text-2xl text-limeade font-medium mb-4">
              Reageren niet nodig om ingeschreven te blijven staan
            </h2>
            <p>
              Het is níet nodig om te reageren op woningen om ingeschreven te
              blijven staan. Als u gaat reageren op woningen zorg dan dat uw
              inschrijfgegevens actueel zijn.
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <img
              src="https://images.pexels.com/photos/4245926/pexels-photo-4245926.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt="img-informatie"
              className="object-cover 2xl:h-96 w-full"
            />
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap items-center">
          <div className="w-full lg:w-1/2">
            <img
              src="https://images.pexels.com/photos/4245921/pexels-photo-4245921.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt="img-informatie"
              className="object-cover 2xl:h-96 w-full"
            />
          </div>

          <div className="container mx-auto px-6 md:px-16 xl:px-24 py-24 lg:py-16 w-full lg:w-1/2 order-first lg:order-last">
            <h2 className="text-xl lg:text-2xl text-limeade font-medium mb-4">
              Tip Service
            </h2>
            <p>
              U kunt kiezen om Tipberichten te ontvangen. U ontvangt dan
              maximaal 2 keer per week een e-mail met de geadverteerde woningen
              die overeenkomen met uw woonwensen en passend zijn bij uw inkomen
              en gezinssamenstelling. Als er géén woningen zijn geadverteerd die
              passend zijn bij uw woonwensen en uw profiel, ontvangt u géén Tip
              Mij bericht.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap items-center bg-fuscous-gray-100">
          <div className="container mx-auto px-6 md:px-16 xl:px-24 py-24 lg:py-16 w-full lg:w-1/2">
            <h2 className="text-xl lg:text-2xl text-limeade font-medium mb-4">
              Heeft u een vraag over een geadverteerde woning of
              woningaanbieding?
            </h2>
            <p>
              Als u een woningaanbieding of een uitnodiging voor een
              bezichtiging heeft ontvangen, bel dan het telefoonnummer dat in de
              brief staat. U stelt dan direct uw vraag aan het team van de
              verhuurder die u een woningaanbieding heeft gedaan.
            </p>
            <p>
              Heeft u een vraag over een geadverteerde woning, neem dan contact
              op met de verhuurder die eigenaar is van de woning. Deze wordt in
              de advertentie vermeld. De contactgegevens vindt u op de pagina
              ‘Contact'.
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <img
              src="https://images.pexels.com/photos/4245924/pexels-photo-4245924.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="img-informatie"
              className="object-cover 2xl:h-96 w-full"
            />
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap items-center border-b">
          <div className="w-full lg:w-1/2">
            <img
              src="https://images.pexels.com/photos/4246233/pexels-photo-4246233.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt="img-informatie"
              className="object-cover 2xl:h-96 w-full"
            />
          </div>

          <div className="container mx-auto px-6 md:px-16 xl:px-24 py-24 lg:py-16 w-full lg:w-1/2 order-first lg:order-last">
            <h2 className="text-xl lg:text-2xl text-limeade font-medium mb-4">
              Veel gestelde vragen
            </h2>
            <p>
              Antwoorden op veel gestelde vragen vindt u hier op de pagina ‘Veel
              gestelde vragen'. Als het antwoord op uw vraag er niet bij staat,
              dan kunt u contact opnemen met het centrale informatienummer 0227
              54 95 40. Dit nummer is voor alle algemene vragen van
              woningzoekenden.
            </p>
          </div>
        </div>
      </section>
    </div>
    <div className="h-20"></div>
  </Layout>
);

export default InformatiePage;
