export const moreInfo1 = [
  {
    title: "U heeft gereageerd op de woning in WoningNet",
    description: "Motorwal 89, 1176 AB in Amsterdam - Noord",
    date: "2 januari 2022 | 20.41 uur",
    type: "success",
  },
  {
    title: "U heeft gereageerd op de woning in WoningNet ",
    description: "Testlaan 5, 1201 AB in Amsterdam Oost",
    date: "8 januari 2022 | 8.05 uur",
    type: "success",
  },
  {
    title: "U heeft gereageerd op de woning in Woonmatch",
    description: "Westervenne 53, 2564 BB in Purmerend",
    date: "14 januari 2022 | 9.13 uur",
    type: "success",
  },
  {
    title: "1 Zoekpunt verdiend",
    description:
      "U heeft deze maand 4 keer op een woning gereageerd. Uw Zoekpunt wordt op 1 februari bijgeschreven",
    date: "20 januari 2022 | 16.45 uur",
    type: "success-check",
  },
];

export const moreInfo2 = [
  {
    title: "Aanvraag situatiepunten ingediend.",
    description:
      "Feb: aanvraag ingediend en aanvraag in behandeling en toegekend",
    date: "",
    type: "success",
  },
  {
    title: "Aanvraag situatiepunten toegekend. U krijgt 1 punt toegekend.",
    description: "maart: 1 situatiepunt er bij",
    date: "8 januari 2022 | 8.05 uur",
    type: "success",
  },
  {
    title: "Situatiepunten toegekend",
    description:
      "Uw punten worden bijgeschreven op april: 1 situatiepunt erbij",
    type: "success-check",
  },
];

export const moreInfo3 = [
  {
    title:
      "U bent niet verschernen bij een bezichtiging op Testlan 5, 1201 AB in Amsterdam oost",
    description: " ",
    date: "Geweigerd op 11 januari 2022 | 17.45 uur",
    type: "fail",
  },
  {
    title: "Aanvraag situatiepunten toegekend. U krijgt 1 punt toegekend.",
    description: " ",
    date: "U werd verwacht op 21 maart 2022 om 14.00 uur",
    type: "fail-warn",
  },
  {
    title: "U krijgt een zware sanctie opgelegd omdat u bent verschenen.",
    description: "U bent uw Zoekpunten & Situatiepunten kwijt",
    date: "Uw verliest deze punten op 1 april 2022",
    type: "fail-warn",
  },
  {
    title: "U bent niet verschenen bij de bezichtiging van ",
    description:
      "De Wouden 150 in Purmerend.Uw zoekpunten en situatiepunten gaan eraf. U behoudt uw wachten. \n U kunt opnieuw Zoekpunten opbouwen door weer actief te reageren op woningen. Situatiepunten kunt u eventueel weer aanvragen als u daarvoor in aanmerking komt.)",
    date: "",
    type: "fail-warn",
  },
];

export const points = [
  {
    date: "Vrijdag, 1 april 2022",
    increase: 0,
    total: 37,
    description: `Wij hebben uw puntensaldo bijgewerkt Uw puntentotaal voor de maand april is`,
    history: [
      {
        description: "Zoekpunten erbij",
        type: "search",
        points: 1,
        details: moreInfo1,
      },
      {
        description: "Situatiepunten erbij",
        type: "activity",
        points: 1,
        details: moreInfo2,
      },
      {
        description: `Niet bij bezichtiging verschenen. Uw zoekpunten en situatiepunten gaan eraf.`,
        type: "search",
        points: -3,
        details: moreInfo3,
      },
    ],
  },
  {
    date: "Dinsdag, 1 maart 2022",
    increase: 10,
    total: 37,
    description: `Wij hebben uw puntensaldo bijgewerkt
Uw puntentotaal voor de maand maart is`,
    history: [
      {
        description: "Startpunten erbij",
        type: "starting",
        points: 10,
        details: moreInfo1,
      },
      {
        description: "Zoekpunt eraf gehaald",
        type: "search",
        points: -1,
        details: moreInfo3,
      },
      {
        description: `Situatiepunten erbij`,
        type: "activity",
        points: 1,
        details: moreInfo2,
      },
    ],
  },
  {
    date: "Dinsdag, 1 januari  2022",
    increase: 0,
    total: 27,

    description: `Wij hebben uw puntensaldo bijgewerkt.
Uw puntentotaal voor de maand januari is`,
    history: [
      {
        description: "Zoekpunten & situatiepunten eraf door 2x te weigeren",
        type: "search",
        points: -6,
        details: moreInfo3,
      },
      {
        description: "Zoekpunt eraf gehaald",
        type: "search",
        points: 1,
        details: moreInfo2,
      },
      {
        description: `Situatiepunten erbij`,
        type: "activity",
        points: 1,
        details: moreInfo1,
      },
    ],
  },
  {
    date: "Dinsdag, 1 januari  2022",
    increase: 2,
    total: 30,
    description: `Wij hebben uw puntensaldo bijgewerkt.
Uw puntentotaal voor de maand januari is`,
    history: [
      {
        description: "Zoekpunt eraf gehaald",
        type: "search",
        points: 1,
        details: moreInfo1,
      },
      {
        description: `Situatiepunten erbij`,
        type: "activity",
        points: 1,
        details: moreInfo2,
      },
    ],
  },
  {
    date: "Dinsdag, 1 december  2022",
    increase: 29,
    total: 30,
    description: `Wij hebben uw puntensaldo bijgewerkt
Uw puntentotaal voor de maand december 2021 is`,
    history: [
      {
        description: "Zoekpunt eraf gehaald",
        type: "search",
        points: 1,
        details: moreInfo1,
      },
      {
        description: `Situatiepunten erbij`,
        type: "activity",
        points: 1,
        details: moreInfo2,
      },
      {
        description: `U heeft de overgangsregeling Woonduur.
Wij hebben uw Woonduur van 27 jaar en 3 maanden omgezet naar punten. De punten zijn toegevoegd aan uw Puntentotaal en zichtbaar in de tegel wachtpunten.`,
        type: "none",
        points: 27,
        details: moreInfo1,
      },
      {
        description: `Uw startsaldo Totaal punten.
Wij hebben uw saldo berekend op uw huidige inschrijfduur vanaf 1 juni 2019 in Woonmatch. Uw saldo is 2 punten.`,
        type: "none",
        points: 2,
        details: moreInfo2,
      },
    ],
  },
];
