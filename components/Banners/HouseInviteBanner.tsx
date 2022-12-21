import moment from "moment";
import InviteCard from "../Cards/InviteCard";

const HouseInviteBanner: React.FC<any> = ({
  houseInvite,
  letter,
  user,
  documents,
}) => {
  return (
    <div className="bg-gradient-to-r from-tertiary  to-primary">
      <section>
        <div className="relative container  pt-10 pb-20">
          {letter && (
            <div className="text-white mb-2 text-sm">
              {letter.name},{" "}
              {moment(letter.regdate).format("DD MMMM YYYY [om] HH:mm")}
            </div>
          )}
          {!letter && (
            <div className="text-50 font-medium text-white mb-5">
              Beste {user.initials} {user.lastname},{" "}
              {!letter?.advert.reaction.status.hasReacted && (
                <span> je hebt een uitnodiging voor een bezichtiging!</span>
              )}
              {letter?.advert.reaction.status.hasReacted && (
                <span> bedankt voor je reactie</span>
              )}
            </div>
          )}

          {letter?.type == "mra_invite_group" && (
            <div className="text-50 font-medium text-white mb-5">
              Beste {user.initials} {user.lastname},
              {!letter?.advert.reaction.status.hasReacted && (
                <span> je hebt een uitnodiging voor een bezichtiging!</span>
              )}
              {letter?.advert.reaction.status.hasReacted && (
                <span> bedankt voor je reactie</span>
              )}
            </div>
          )}

          {letter?.type == "mra_invite_current" && (
            <div className="text-50 font-medium text-white mb-5">
              Beste {user.initials} {user.lastname}{" "}
              {!letter?.advert.reaction.status.hasReacted && (
                <span> je hebt een uitnodiging voor een bezichtiging!</span>
              )}
              {letter?.advert.reaction.status.hasReacted && (
                <span> bedankt voor je reactie</span>
              )}
            </div>
          )}

          {letter?.type == "mra_followup_group" && (
            <div className="text-50 font-medium text-white mb-5">
              Beste {user.initials} {user.lastname},
              {!letter?.advert.reaction.status.hasReacted && (
                <span> hoe vond je de woning?</span>
              )}
              {letter?.advert.reaction.status.hasReacted && (
                <span> we hebben je reactie verwerkt</span>
              )}
            </div>
          )}

          {letter?.type == "mra_followup_current" && (
            <div className="text-50 font-medium text-white mb-5">
              Beste {user.initials} {user.lastname},
              {!letter?.advert.reaction.status.hasReacted && (
                <span> hoe vond je de woning?</span>
              )}
              {letter?.advert.reaction.status.hasReacted && (
                <span> we hebben je reactie verwerkt</span>
              )}
            </div>
          )}

          {letter?.type == "offer_without_meeting" && (
            <div className="text-50 font-medium text-white mb-5">
              Beste {user.initials} {user.lastname},
              {!letter?.advert.reaction.status.hasReacted && (
                <span> je bent de eerste kandidaat voor een woning.</span>
              )}
              {letter?.advert.reaction.status.hasReacted && (
                <span> wij hebben uw reactie verwerkt</span>
              )}
            </div>
          )}

          {letter?.type == "offer_with_meeting" && (
            <div className="text-50 font-medium text-white mb-5">
              Beste {user.initials} {user.lastname},
              {!letter?.advert.reaction.status.hasReacted && (
                <span> je bent de eerste kandidaat voor een woning.</span>
              )}
              {letter?.advert.reaction.status.hasReacted && (
                <span> wij hebben uw reactie verwerkt</span>
              )}
            </div>
          )}

          {letter?.type == "gauge_interest" && (
            <div className="text-50 font-medium text-white mb-5">
              Beste {user.initials} {user.lastname}, heb je nog interesse in
              deze woning?
            </div>
          )}
          <InviteCard documents={documents} contentObject={houseInvite} />
        </div>
      </section>
    </div>
  );
};

export default HouseInviteBanner;
