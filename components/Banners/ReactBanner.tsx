import Link from "next/link";
import { useSnapshot } from "valtio";
import { userStore } from "../../store/auth";
import FooterBanner from "./FooterBanner";

type Props = {
  houseId: string;
  handleReaction?: any;
};

const ReactBanner: React.FC<any> = ({
  houseId,
  handleReaction = undefined,
}: Props) => {
  const store = useSnapshot(userStore);

  return (
    <FooterBanner
      image="/images/register-artwork.svg"
      title="REAGEREN"
      subtitle={`Wilt u graag een reactie sturen op deze woning?\nReageer dan direct?`}
      buttons={[
        {
          text: "Terug naar overzicht",
          type: "link",
          link: "/houses",
        },
        {
          text: "Reageer op deze woning",
          type: "button",
          onClick: handleReaction,
        },
      ]}
    />
  );
};

export default ReactBanner;
