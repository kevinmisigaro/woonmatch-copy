import Link from "next/link";
import FooterBanner from "./FooterBanner";

const RegisterBanner: React.FC<any> = () => {
  return (
    <FooterBanner
      image="/images/register-artwork.svg"
      title="INSCHRIJVEN"
      subtitle={`Heb je nog geen account van Woonmatch?\nMaak je account direct aan`}
      buttons={[
        {
          text: "Inschrijven",
          type: "link",
          link: "/register",
        },
      ]}
    />
  );
};

export default RegisterBanner;
