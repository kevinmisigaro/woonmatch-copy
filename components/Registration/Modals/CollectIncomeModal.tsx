import { useRouter } from "next/router";
import React from "react";

export default function CollectIncomeModal() {

  const router = useRouter()
  const changePage = () => {
    localStorage.setItem('process', 'shorter')
    router.push('/houseregister/steps/first')
  }
 
  return (
    <div className="h-auto text-justify text-gray-500 font-light text-base">
      <div className="space-y-8 px-8 md:px-16 my-10">
        <div className="mb-3">
          <p>
            U kunt uw inkomensverklaring(IB60) van NaN tot en met zelf
            downloaden in Mijn Belastingdienst. U kunt ook een kopie maken van
            uw aanslag inkomstenbelasting. Daat is vaak ook goed. Downloaden
            doet u zo:
            <br />
            <br />U kunt uw exacte jaaringkomen vinden op uw
            Inkkomenscerklaring. U kunt deze opvragen bij de Belastindienst. Dit
            doet u als volgt:
          </p>

          <ol className="list-decimal pl-6 mt-5 mb-4 leading-7">
            <li>
              Log in op Mijn Belastingdienst:
              {"  "}
              <span className="text-primary">Mijn Belastingdienst.</span>
            </li>
            <li>Klik op 'Mijn gegevens'.</li>
            <li>
              Klik op 'Inkomensverklaring opvragen en geregistreerd inkomen
              bekijken' .
            </li>
            <li>
              Klik vervolgems op 'Inkomensveerklaring opvragen' bij het jaar
              waarvoor u een inkomensverklaring wilt. Indien al beschikbaar is
              kiest u daarvoor, anders voor 2021.
            </li>
            <li>
              Er opent een PDF die kunt opslaan. Let op:
              <span className="italic">
                U kunt dit document direct uploaden als Inkomensverklaring in de
                stap "Uw Documenten".
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
              U kunt veilig naar de website van de belastingdienst doorklikken.
              Woonmatch verwijst u naar de belastingdienst, maar kan niet voor u
              inloggen of de gegevens van de belastingdienst gebruiken.
            </p>
          </div>
        </div>
      </div>
      <div onClick={changePage} className="bg-tertiary w-full py-3 cursor-pointer text-white text-center font-normal">
        Akoord met privacyverlaring
      </div>
    </div>
  );
}
