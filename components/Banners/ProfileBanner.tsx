import FooterBanner from "./FooterBanner";

const ProfileBanner: React.FC<any> = () => {
  return (
    <FooterBanner
      image="/images/profile.svg"
      title="INSCHRIJVEN"
      subtitle={`Is uw profiel helemaal goed? Om heel goed te kunnen zoeken moet je dit
          hebben. Vul gelijk je profiel aan.`}
      buttons={[
        {
          text: "Ga naar mijn profiel",
          type: "link",
          link: "/profile",
        },
      ]}
    />
  );
};

export default ProfileBanner;
