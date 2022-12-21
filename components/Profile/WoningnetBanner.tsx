import Link from "next/link";
import moment from "moment";

export default function WoningnetBanner({wnConnector, allowMRAConnect}) {
  return (
       <div className="w-full bg-primary flex flex-col md:flex-row py-14 px-8 md:px-2">
      <div className="basis-1/3">
        <div className="rounded-lg bg-white my-5 mx-24 flex flex-row justify-center py-20">
          <img src="/logos/woningnet.svg" />
        </div>
      </div>
      <div className="basis-2/3 text-white">
        <p className="text-lg mt-3 md:mt-0">WoningNet</p>
        { wnConnector.status === 'noConnection' && (
          <p className="text-xl md:text-3xl font-semibold mt-3">
            Heeft u ook een account bij WoningNet Stadsregio <br />
            Amsterdam? Dan kunt u eenvoudig uw WoningNet <br />
            account koppelen met uw Woonmatch account.
          </p>
        )}
        { wnConnector.status === 'confirmed' && (
            <>
              <p className="text-xl md:text-3xl font-semibold mt-3">
                Uw Woonmatch account is gekoppeld aan uw WoningNet account! <br/>
              </p>
              <p className="text-md md:text-xl font-semibold mt-3">
                WoningNet account: {wnConnector.data.wnUsername} <br/>
                Koppeling aangevraagd op: {moment(wnConnector.data.dateRequested).format('DD-MM-YYYY')} <br/>
                Koppeling bevestigd op: {moment(wnConnector.data.dateConfirmed).format('DD-MM-YYYY')} <br/>
              </p>
            </>
        )}
        { wnConnector.status === 'pending' && (
            <>
                <p className="text-xl md:text-3xl font-semibold mt-3">
                    U heeft een koppeling tussen uw Woonmatch en uw WoningNet account aangevraagd <br/>
                </p>
                <p className="text-md md:text-xl font-semibold mt-3">
                    De koppeling is nog niet bevestigd. <br/>
                    U kunt uw koppeling bevestigen in uw WoningNet account. <br/>
                </p>
            </>
        )}
        { wnConnector.status === 'rejected' && (
            <>
              <p className="text-xl md:text-3xl font-semibold mt-3">
                U heeft een koppeling tussen uw Woonmatch en uw WoningNet account aangevraagd <br/>
              </p>
              <p className="text-md md:text-xl font-semibold mt-3">
                De koppeling is afgewezen. <br/>
                Controleer of uw gegevens in Woonmatch en WoningNet het zelfde zijn, en probeer het opnieuw.<br/>
              </p>
            </>
        )}


        { wnConnector.status !== 'confirmed' && wnConnector.status !== 'pending' && (
            <>
                {allowMRAConnect ? (

                      <Link href="/woningnet">
                        <div className="flex flex-row cursor-pointer rounded justify-center bg-white mx-2 text-primary py-2 w-5/6 md:w-2/3 mt-7">
                          Koppel mijn WoningNet account
                        </div>
                      </Link>

                ) : (
                    <Link href="">
                        <div className="flex flex-row cursor-pointer rounded justify-center bg-white mx-2 text-primary py-2 w-5/6 md:w-2/3 mt-7 disabled">
                            U kunt uw account pas koppelen als uw account tenminste 5 minuten oud is
                        </div>
                    </Link>
                )}
            </>
        )}
      </div>
    </div>
  );
}
