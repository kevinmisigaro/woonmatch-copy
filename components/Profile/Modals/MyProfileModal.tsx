import React from "react";

export default function MyProfileModal({ show = false, onClose = null }) {
  return (
    <>
      {show && (
        <div className="fixed z-50 inset-0 py-10 flex flex-col items-center justify-center bg-black/80">
          <div
            className={`w-11/12 relative min-h-min overflow-x-hidden overflow-y-visible bg-white  text-black rounded-sm shadow-lg`}>
            <button
              onClick={() => {
                onClose();
              }}
              className="absolute top-0 right-0 h-10 grid place-content-center aspect-square ">
              <img src="/images/close-x.svg" className="w-3" />
            </button>

            <div className="text-white font-normal py-6 bg-tertiary"></div>
            <div className="w-full">
              {/* first section  */}
              <div className="mx-auto pt-6 pb-24 px-16 bg-why">
                <div className="text-3xl py-5 text-white font-medium">
                  Mijn punten
                </div>

                <div className="grid grid-cols-2 mt-5 gap-x-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 bg-tertiary rounded px-6 py-4 group cursor-pointer">
                      <div className="text-white">
                        <div>Totaal punten</div>
                        <div className="text-5xl mt-5">36</div>
                      </div>
                      <div className="flex flex-row justify-end group-hover:justify-between mt-4">
                        <div className="hidden group-hover:block text-xs font-thin text-primary shadow-lg bg-white rounded px-3 py-1.5">
                          Mer uitleg
                        </div>
                        <div className="font-thin text-xs text-white">
                          Je punten zijn bijgewerkt op: 1 januari 2022
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded">
                      <div className="px-6 pt-4 pb-1">
                        <div className="text-center text-black font-medium">
                          Wachtpunten
                        </div>
                        <div className="text-tertiary font-medium text-4xl text-right w-5/6">
                          27
                        </div>
                      </div>
                      <div className="flex flex-row justify-start h-20">
                        <div
                          className="bg-gray-300 basis-3/5"
                          style={{ borderTopRightRadius: "3.2rem" }}></div>
                      </div>
                    </div>

                    <div className="bg-white rounded">
                      <div className="px-6 pt-4 pb-1">
                        <div className="text-center text-black font-medium">
                          Zoekpunten
                        </div>
                        <div className="text-tertiary font-medium text-4xl text-right w-5/6">
                          1
                        </div>
                      </div>
                      <div className="flex flex-row justify-start h-20">
                        <div
                          className="bg-gray-300 basis-3/5"
                          style={{ borderTopRightRadius: "3.2rem" }}></div>
                      </div>
                    </div>

                    <div className="bg-primary text-white rounded">
                      <div className="px-6 pt-4 pb-1">
                        <div className="text-center font-medium">
                          Situatiepunten
                        </div>
                        <div className="font-medium text-4xl text-right w-5/6">
                          1
                        </div>
                      </div>
                      <div className="flex flex-row justify-start h-20">
                        <div
                          className="bg-gray-300 basis-3/5"
                          style={{ borderTopRightRadius: "3.2rem" }}></div>
                      </div>
                    </div>

                    <div className="bg-white rounded">
                      <div className="px-6 pt-4 pb-1">
                        <div className="text-center text-black font-medium">
                          Startpunten
                        </div>
                        <div className="text-tertiary font-medium text-4xl text-right w-5/6">
                          10
                        </div>
                      </div>
                      <div className="flex flex-row justify-start h-20">
                        <div
                          className="bg-gray-300 basis-3/5"
                          style={{ borderTopRightRadius: "3.2rem" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 grid grid-rows-2">
                    <div className="bg-white py-6 px-10 flex flex-col justify-between">
                      <div className="text-primary text-sm font-medium">
                        Uitleg over het nieuwe puntensysteem
                      </div>
                      <div className="font-normal text-gray-500 text-sm">
                        Het systeem is veranderd.
                        <br />
                        Dit heeft invloed op de snelheid waarmee u een woning
                        vindt.
                      </div>
                      <div className="text-primary text-xs">Lees meer</div>
                    </div>
                    <div className="bg-green-200"></div>
                  </div>
                </div>
              </div>
              {/* end of first section */}

              {/* start of second section  */}
              <div className="flex flex-row">
                <div className="basis-4/6">
                  <div className="flex flex-row justify-between px-6 py-6 bg-gray-300">
                    <div className="text-sm font-normal text-black">Filter</div>

                    <div className="bg-white p-px cursor-pointer">
                      <div className="text-xs font-normal px-6 py-2 bg-gray-300 text-black hover:text-primary">
                        Download
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-6">
                   
                     {/* date section */}
                     <div className="mb-12">
                      <div className="flex flex-row justify-between mb-3">
                        <div className="text-primary text-xs font-normal">
                          Vrijdag, 1 april 2022
                        </div>
                        <div className="text-gray-400 text-xs">
                          U heeft voor deze maand{" "}
                          <span className="text-red-300">0</span> punten
                          afgebouwd
                        </div>
                      </div>

                      {/* start of table  */}
                      <div className="border border-primary rounded-md">
                        {/* start of header  */}
                        <div className="bg-primary px-10 py-5 items-center text-white flex flex-row justify-between">
                          <div className="text-xs">
                            Wij hebben uw puntensaldo bijgewerkt <br />
                            Uw puntentotaal voor de maand april is
                          </div>
                          <div>
                            <div className="text-xs font-extralight">
                              Punten
                            </div>
                            <div className="text-sm mt-4">37</div>
                          </div>
                        </div>
                        {/* end of header */}

                        {/* start of row  */}
                        <div className="flex flex-row justify-between px-10 py-1 my-5 items-center bg-white hover:bg-gray-200 cursor-pointer">
                          <div className="flex flex-col gap-y-2">
                            <div className="text-xs font-extralight text-gray-400">
                              Actie
                            </div>
                            <div className="text-sm text-gray-500">
                              Zoekpunten erbij
                            </div>
                          </div>

                          <div className="flex flex-col justify-between py-3 gap-y-5">
                            <div className="text-xs font-extralight text-gray-400">
                              Punten
                            </div>
                            <div className="text-tertiary text-sm">+1</div>
                          </div>
                        </div>
                        {/* end of row */}

                        {/* start of row  */}
                        <div className="flex flex-row justify-between px-10 py-1 my-5 items-center bg-white hover:bg-gray-200 cursor-pointer">
                          <div className="flex flex-col gap-y-2">
                            <div className="text-xs font-extralight text-gray-400">
                              Actie
                            </div>
                            <div className="text-sm text-gray-500">
                              Situatiepunten erbij
                            </div>
                          </div>

                          <div className="flex flex-col justify-between py-3 gap-y-5">
                            <div className="text-xs font-extralight text-gray-400">
                              Punten
                            </div>
                            <div className="text-tertiary text-sm">+1</div>
                          </div>
                        </div>
                        {/* end of row */}

                         {/* start of row  */}
                         <div className="flex flex-row justify-between px-10 py-1 my-5 items-center bg-white hover:bg-gray-200 cursor-pointer">
                          <div className="flex flex-col gap-y-2">
                            <div className="text-xs font-extralight text-gray-400">
                              Actie
                            </div>
                            <div className="text-sm text-gray-500">
                              Niet bij bezichtiging verschenen. <br/>
                              Uw zoekpunten en situatiepunten geen eref.
                            </div>
                          </div>

                          <div className="flex flex-col justify-between py-3 gap-y-5">
                            <div className="text-xs font-extralight text-gray-400">
                              Punten
                            </div>
                            <div className="text-red-400 text-sm">-3</div>
                          </div>
                        </div>
                        {/* end of row */}

                      </div>
                      {/* end of table */}

                    </div>
                    {/* end of date section */}

                     {/* date section */}
                     <div className="mb-12">
                      <div className="flex flex-row justify-between mb-3">
                        <div className="text-primary text-xs font-normal">
                          Dinsdag, 1 maart 2022
                        </div>
                        <div className="text-gray-400 text-xs">
                          U heeft voor deze maand{" "}
                          <span className="text-primary">+10</span> punten
                          opgebouwd
                        </div>
                      </div>

                      {/* start of table  */}
                      <div className="border border-primary rounded-md">
                        {/* start of header  */}
                        <div className="bg-primary px-10 py-5 items-center text-white flex flex-row justify-between">
                          <div className="text-xs">
                            Wij hebben uw puntensaldo bijgewerkt <br />
                            Uw puntentotaal voor de maand maart is
                          </div>
                          <div>
                            <div className="text-xs font-extralight">
                              Punten
                            </div>
                            <div className="text-sm mt-4">37</div>
                          </div>
                        </div>
                        {/* end of header */}

                        {/* start of row  */}
                        <div className="flex flex-row justify-between px-10 py-1 my-5 items-center bg-white hover:bg-gray-200 cursor-pointer">
                          <div className="flex flex-col gap-y-2">
                            <div className="text-xs font-extralight text-gray-400">
                              Actie
                            </div>
                            <div className="text-sm text-gray-500">
                              Startpunten erbij
                            </div>
                          </div>

                          <div className="flex flex-col justify-between py-3 gap-y-5">
                            <div className="text-xs font-extralight text-gray-400">
                              Punten
                            </div>
                            <div className="text-tertiary text-sm">+10</div>
                          </div>
                        </div>
                        {/* end of row */}

                        {/* start of row  */}
                        <div className="flex flex-row justify-between px-10 py-1 my-5 items-center bg-white hover:bg-gray-200 cursor-pointer">
                          <div className="flex flex-col gap-y-2">
                            <div className="text-xs font-extralight text-gray-400">
                              Actie
                            </div>
                            <div className="text-sm text-gray-500">
                              Zoekpunt eraf gehaald
                            </div>
                          </div>

                          <div className="flex flex-col justify-between py-3 gap-y-5">
                            <div className="text-xs font-extralight text-gray-400">
                              Punten
                            </div>
                            <div className="text-red-400 text-sm">-1</div>
                          </div>
                        </div>
                        {/* end of row */}

                         {/* start of row  */}
                         <div className="flex flex-row justify-between px-10 py-1 my-5 items-center bg-white hover:bg-gray-200 cursor-pointer">
                          <div className="flex flex-col gap-y-2">
                            <div className="text-xs font-extralight text-gray-400">
                              Actie
                            </div>
                            <div className="text-sm text-gray-500">
                            Situatiepunten erbij
                            </div>
                          </div>

                          <div className="flex flex-col justify-between py-3 gap-y-5">
                            <div className="text-xs font-extralight text-gray-400">
                              Punten
                            </div>
                            <div className="text-tertiary text-sm">+1</div>
                          </div>
                        </div>
                        {/* end of row */}

                      </div>
                      {/* end of table */}

                    </div>
                    {/* end of date section */}

                     {/* date section */}
                     <div className="mb-12">
                      <div className="flex flex-row justify-between mb-3">
                        <div className="text-primary text-xs font-normal">
                          Dinsdag, 1 februari 2022
                        </div>
                        <div className="text-gray-400 text-xs">
                          U heeft voor deze maand{" "}
                          <span className="text-red-400">0</span> punten
                          opgebouwd
                        </div>
                      </div>

                      {/* start of table  */}
                      <div className="border border-primary rounded-md">
                        {/* start of header  */}
                        <div className="bg-primary px-10 py-5 items-center text-white flex flex-row justify-between">
                          <div className="text-xs">
                            Wij hebben uw puntensaldo bijgewerkt <br />
                            Uw puntentotaal voor de maand februari is
                          </div>
                          <div>
                            <div className="text-xs font-extralight">
                              Punten
                            </div>
                            <div className="text-sm mt-4">37</div>
                          </div>
                        </div>
                        {/* end of header */}

                        {/* start of row  */}
                        <div className="flex flex-row justify-between px-10 py-1 my-5 items-center bg-white hover:bg-gray-200 cursor-pointer">
                          <div className="flex flex-col gap-y-2">
                            <div className="text-xs font-extralight text-gray-400">
                              Actie
                            </div>
                            <div className="text-sm text-gray-500">
                             Zoekpunten & situatiepunten eraf door 2x te weigeren
                            </div>
                          </div>

                          <div className="flex flex-col justify-between py-3 gap-y-5">
                            <div className="text-xs font-extralight text-gray-400">
                              Punten
                            </div>
                            <div className="text-red-400 text-sm">-6</div>
                          </div>
                        </div>
                        {/* end of row */}

                        {/* start of row  */}
                        <div className="flex flex-row justify-between px-10 py-1 my-5 items-center bg-white hover:bg-gray-200 cursor-pointer">
                          <div className="flex flex-col gap-y-2">
                            <div className="text-xs font-extralight text-gray-400">
                              Actie
                            </div>
                            <div className="text-sm text-gray-500">
                              Zoekpunten erbij
                            </div>
                          </div>

                          <div className="flex flex-col justify-between py-3 gap-y-5">
                            <div className="text-xs font-extralight text-gray-400">
                              Punten
                            </div>
                            <div className="text-tertiary text-sm">+1</div>
                          </div>
                        </div>
                        {/* end of row */}

                         {/* start of row  */}
                         <div className="flex flex-row justify-between px-10 py-1 my-5 items-center bg-white hover:bg-gray-200 cursor-pointer">
                          <div className="flex flex-col gap-y-2">
                            <div className="text-xs font-extralight text-gray-400">
                              Actie
                            </div>
                            <div className="text-sm text-gray-500">
                            Situatiepunten erbij
                            </div>
                          </div>

                          <div className="flex flex-col justify-between py-3 gap-y-5">
                            <div className="text-xs font-extralight text-gray-400">
                              Punten
                            </div>
                            <div className="text-tertiary text-sm">+1</div>
                          </div>
                        </div>
                        {/* end of row */}

                      </div>
                      {/* end of table */}

                    </div>
                    {/* end of date section */}

                     {/* date section */}
                     <div className="mb-12">
                      <div className="flex flex-row justify-between mb-3">
                        <div className="text-primary text-xs font-normal">
                          Dinsdag, 1 januari 2022
                        </div>
                        <div className="text-gray-400 text-xs">
                          U heeft voor deze maand{" "}
                          <span className="text-tertiary">+2</span> punten
                          opgebouwd
                        </div>
                      </div>

                      {/* start of table  */}
                      <div className="border border-primary rounded-md">
                        {/* start of header  */}
                        <div className="bg-primary px-10 py-5 items-center text-white flex flex-row justify-between">
                          <div className="text-xs">
                            Wij hebben uw puntensaldo bijgewerkt <br />
                            Uw puntentotaal voor de maand januari is
                          </div>
                          <div>
                            <div className="text-xs font-extralight">
                              Punten
                            </div>
                            <div className="text-sm mt-4">37</div>
                          </div>
                        </div>
                        {/* end of header */}

                        {/* start of row  */}
                        <div className="flex flex-row justify-between px-10 py-1 my-5 items-center bg-white hover:bg-gray-200 cursor-pointer">
                          <div className="flex flex-col gap-y-2">
                            <div className="text-xs font-extralight text-gray-400">
                              Actie
                            </div>
                            <div className="text-sm text-gray-500">
                             Zoekpunten erbij
                            </div>
                          </div>

                          <div className="flex flex-col justify-between py-3 gap-y-5">
                            <div className="text-xs font-extralight text-gray-400">
                              Punten
                            </div>
                            <div className="text-tertiary text-sm">+1</div>
                          </div>
                        </div>
                        {/* end of row */}

                        {/* start of row  */}
                        <div className="flex flex-row justify-between px-10 py-1 my-5 items-center bg-white hover:bg-gray-200 cursor-pointer">
                          <div className="flex flex-col gap-y-2">
                            <div className="text-xs font-extralight text-gray-400">
                              Actie
                            </div>
                            <div className="text-sm text-gray-500">
                              Situatiepunten erbij
                            </div>
                          </div>

                          <div className="flex flex-col justify-between py-3 gap-y-5">
                            <div className="text-xs font-extralight text-gray-400">
                              Punten
                            </div>
                            <div className="text-tertiary text-sm">+1</div>
                          </div>
                        </div>
                        {/* end of row */}

                      </div>
                      {/* end of table */}

                    </div>
                    {/* end of date section */}

                     {/* date section */}
                     <div className="mb-12">
                      <div className="flex flex-row justify-between mb-3">
                        <div className="text-primary text-xs font-normal">
                          Dinsdag, 1 december 2021
                        </div>
                        <div className="text-gray-400 text-xs">
                          U heeft voor deze maand{" "}
                          <span className="text-primary">+29</span> punten
                          opgebouwd
                        </div>
                      </div>

                      {/* start of table  */}
                      <div className="border border-primary rounded-md">
                        {/* start of header  */}
                        <div className="bg-primary px-10 py-5 items-center text-white flex flex-row justify-between">
                          <div className="text-xs">
                            Wij hebben uw puntensaldo bijgewerkt <br />
                            Uw puntentotaal voor de maand december 2021 is
                          </div>
                          <div>
                            <div className="text-xs font-extralight">
                              Punten
                            </div>
                            <div className="text-sm mt-4">30</div>
                          </div>
                        </div>
                        {/* end of header */}

                        {/* start of row  */}
                        <div className="flex flex-row justify-between px-10 py-1 my-5 items-center bg-white hover:bg-gray-200 cursor-pointer">
                          <div className="flex flex-col gap-y-2">
                            <div className="text-xs font-extralight text-gray-400">
                              Actie
                            </div>
                            <div className="text-sm text-gray-500">
                             Zoekpunten erbij
                            </div>
                          </div>

                          <div className="flex flex-col justify-between py-3 gap-y-5">
                            <div className="text-xs font-extralight text-gray-400">
                              Punten
                            </div>
                            <div className="text-tertiary text-sm">+1</div>
                          </div>
                        </div>
                        {/* end of row */}

                        {/* start of row  */}
                        <div className="flex flex-row justify-between px-10 py-1 my-5 items-center bg-white hover:bg-gray-200 cursor-pointer">
                          <div className="flex flex-col gap-y-2">
                            <div className="text-xs font-extralight text-gray-400">
                              Actie
                            </div>
                            <div className="text-sm text-gray-500">
                              Situatiepunten toegekend
                            </div>
                          </div>

                          <div className="flex flex-col justify-between py-3 gap-y-5">
                            <div className="text-xs font-extralight text-gray-400">
                              Punten
                            </div>
                            <div className="text-tertiary text-sm">+1</div>
                          </div>
                        </div>
                        {/* end of row */}

                         {/* start of row  */}
                         <div className="flex flex-row justify-between px-10 py-1 my-5 items-center bg-white hover:bg-gray-200 cursor-pointer">
                          <div className="flex flex-col gap-y-2">
                            <div className="text-xs font-extralight text-gray-400">
                              Actie
                            </div>
                            <div className="text-sm text-gray-500">
                            U heeft de overgangsregeling Woonduur. <br/>
                            Wijn hebben uw Woonduur van 27 jaar een 3 maanden omgezet naar <br/>
                            punten. De punten zij toegevoegd aan uw Puntentotaal en zichtbaar in <br/>
                            de tegel wachtpunten.
                            </div>
                          </div>

                          <div className="flex flex-col justify-between py-3 gap-y-5">
                            <div className="text-xs font-extralight text-gray-400">
                              Punten
                            </div>
                            <div className="text-tertiary text-sm">27</div>
                          </div>
                        </div>
                        {/* end of row */}


                         {/* start of row  */}
                         <div className="flex flex-row justify-between px-10 py-1 my-5 items-center bg-white hover:bg-gray-200 cursor-pointer">
                          <div className="flex flex-col gap-y-2">
                            <div className="text-xs font-extralight text-gray-400">
                              Actie
                            </div>
                            <div className="text-sm text-gray-500">
                            Uw startsaldo Totaal punten. <br/>
                            Wij hebben uw seldo berekend op uw huidige inschrijfduur <br/>
                            vanaf 1 juni 2019 in Woonmath. Uw saldo is 2 punten.
                            </div>
                          </div>

                          <div className="flex flex-col justify-between py-3 gap-y-5">
                            <div className="text-xs font-extralight text-gray-400">
                              Punten
                            </div>
                            <div className="text-tertiary text-sm">2</div>
                          </div>
                        </div>
                        {/* end of row */}

                      </div>
                      {/* end of table */}

                    </div>
                    {/* end of date section */}

                    <div className="flex flex-row justify-end">
                <div className="bg-tertiary text-white px-8 py-1 rounded text-sm">
                    Ga naar mijn profiel
                </div>
              </div>


                  </div>
                </div>
                <div className="basis-2/6 bg-white py-5 px-8">
                  <div className="text-black text-sm font-medium">
                    Details activiteiten
                  </div>
                  <div className="text-gray-500 text-sm italic font-light mt-10">
                    Klik op een actie om de details <br />
                    van uw activiteiten te bekijken.
                  </div>
                </div>
              </div>
              {/* end of second section */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
