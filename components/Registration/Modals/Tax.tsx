import React from "react";
import { RegisterPopUp } from "../RegisterPopUp";

export default function Tax({ handleClose, show }) {
  return (
    <RegisterPopUp
      title="Inkomen ophalen bij Belastingdienst"
      show={show}
      onClose={handleClose}>
      <div className="h-auto text-justify text-gray-500 font-light text-base">
        <div className="space-y-8 px-8 md:px-16 my-10">
          <div className="mb-3">
            <p>
              U kunt uw inkomensverklaring (IB60) van 2016 tot en met 2022 zelf
              downloaden in Mijn Belastingdienst. U kunt ook een kopie maken van
              uw aanslag inkomstenbelasting. Dat is vaak ook goed.
              <br />
              Downloaden doet u zo:
              <br />
              <br />U kunt uw exacte jaarinkomen vinden op uw
              Inkomensverklaring. U kunt deze opvragen bij de Belastingdienst.
              Dit doet u als volgt:
            </p>

            <ol className="list-decimal pl-6 mt-5 mb-4 leading-7">
              <li>
                Log in op Mijn Belastingdienst:
                {"  "}
                <a className="text-primary cursor-pointer hover:underline"
                  href={`https://mijn.belastingdienst.nl/GTService/#/inloggen`}  rel="noopener noreferrer" target="_blank">
                  Mijn Belastingdienst.
                </a>
              </li>
              <li>Klik op 'Mijn gegevens'.</li>
              <li>
                Klik vervolgens op ‘Inkomensverklaring opvragen’ bij het jaar
                waarvoor u een inkomensverklaring wilt. Indien 2022 al
                beschikbaar is, kiest u daarvoor, anders voor 2021.
              </li>
              <li>
                Klik vervolgens op ‘Inkomensverklaring opvragen’ bij het jaar
                waarvoor u een inkomensverklaring wilt. Indien 2022 al
                beschikbaar is, kiest u daarvoor, anders voor 2021.
              </li>
              <li>
                Er opent een PDF die u kunt opslaan.
                <span className="italic">
                  Let op: U kunt dit document direct uploaden als
                  Inkomensverklaring in de stap "Uw Documenten".
                </span>
              </li>
              <li>
                In het document wat u zojuist hebt opgeslagen staat
                "Verzamelinkomen" gevolgd door een bedrag. Vul dit bedrag zonder
                Euro-teken en punt in bij 'Inkomen per jaar'.
              </li>
            </ol>
            <div>
              <p className="italic mt-8">
                U kunt veilig naar de website van de belastingdienst
                doorklikken. Woonmatch verwijst u naar de belastingdienst, maar
                kan niet voor u inloggen of de gegevens van de belastingdienst
                gebruiken.
              </p>
            </div>
          </div>
        </div>
        <div
          onClick={handleClose}
          className="bg-tertiary w-full py-3 cursor-pointer text-white text-center font-normal">
          Sluiten
        </div>
      </div>
    </RegisterPopUp>
  );
}
