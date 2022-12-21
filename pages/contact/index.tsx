import React from "react";
import RegisterOrProfileBanner from "../../components/Banners/RegisterOrProfileBanner";
import Layout from "../../components/Layouts/SiteLayout";

export default function Index() {
  return (
    <Layout title="Contact" bgColor="bg-fuscous-gray-100" footerBanner={<RegisterOrProfileBanner />}>
      <div
        style={{
          backgroundImage: "url('/bg-images/contact/contact-bg.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}>
        <div className="container py-20">
          <div className="mx-14 border border-1 py-20 px-10 bg-white">
            <p className="text-primary font-bold text-2xl">Contact</p>

            <p className="font-bold mt-10">Heeft u hulp nodig?</p>

            <p className="mt-3 text-sm">
              U kunt uw vragen telefonisch stellen via 088-17 18 190 op wekdagen
              van 8.00 uur tot 17.00 uur.
            </p>

            <p className="mt-3 text-sm">
              Struurt u ons liever een bericht? Dat mag ook. Klik hier.
            </p>

            <p className="mt-3 underline font-semibold">Intermaris</p>

            <p className="mt-3 text-sm">
              Kometenstraat 6, 1443 BA Purmerend, op werkdagen geopend van 8.30
              to 12.30.
            </p>

            <p className="mt-3 underline font-semibold">Wooncompagnie</p>

            <p className="mt-3 text-sm">
              Wilt u langskomen op kantoor? Maak dan een afspraak via onze
              afdeling Klantcontact op 088 - 17 18 190 - bereikbaar op werkdagen
              van 8.00 tot 17.00 ur.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
