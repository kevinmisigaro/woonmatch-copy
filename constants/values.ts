const offer_options = [
  {
    id: "all",
    title: "Alles",
    isSelected: true,
  },
  {
    id: "nieuwbouw",
    title: "Nieuwbouw",
    isSelected: false,
  },
  {
    id: "seniorenwoning",
    title: "Seniorenwoning",
    isSelected: false,
  },
  {
    id: "met-situatiepunten",
    title: "Met situatiepunten",
    isSelected: false,
  },
];

const offer_options_others = [
  {
    id: "voorrang-doorstromers",
    title: "Voorrang doorstromers",
    isSelected: false,
  },
  {
    id: "anders-toewijzen",
    title: "Anders toewijzen",
    isSelected: false,
  },
  {
    id: "spoedzoekers",
    title: "Spoedzoekers",
    isSelected: false,
  },
  {
    id: "voorrang-jongeren",
    title: "Voorrang jongeren",
    isSelected: false,
  },
  {
    id: "voorrang-jongeren",
    title: "Gelijkvloerse woning",
    isSelected: false,
  },
  {
    id: "rolstoel-toegankelijk",
    title: "Rolstoel toegankelijk",
    isSelected: false,
  },
  {
    id: "zorg",
    title: "Zorg",
    isSelected: false,
  },
];

const sorter = [
  {
    text: "Geen Sortering",
    value: "default",
  },
  {
    text: "Huur Prijs: Laag naar Hoog",
    value: "rentLowHigh",
  },
  {
    text: "Huur Prijs: Hoog naar Laag",
    value: "rentHighLow",
  },
  {
    text: "Datum: Laag naar Hoog",
    value: "dateLowHigh",
  },
  {
    text: "Datum: Hoog naar Laag",
    value: "dateHighLow",
  },
  {
    text: "Oppervlak: Laag naar Hoog",
    value: "surfaceLowHigh",
  },
  {
    text: "Oppervlak: Hoog naar Laag",
    value: "surfaceHighLow",
  },
  {
    text: "Reacties: Laag naar Hoog",
    value: "reactionsLowHigh",
  },
  {
    text: "Reacties: Hoog naar Laag",
    value: "reactionsHighLow",
  },
];

const roomOptions = [
  { value: 0, text: "0 slaapkamers" },
  { value: 1, text: "1 slaapkamer" },
  { value: 2, text: "2 slaapkamers" },
  { value: 3, text: "3 slaapkamers" },
  { value: 4, text: "4 of meer slaapkamers" },
];

export { offer_options, sorter, offer_options_others, roomOptions };
