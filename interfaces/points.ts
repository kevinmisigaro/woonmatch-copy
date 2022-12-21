interface Soort {
  code: string;
  naam: string;
}
interface BaseInfo {
  id: string;
  idExtern: string;
  idGegevensbeheerder?: string;
}

interface Gebeurtenissen extends BaseInfo {
  datum: string;
  adres: Adres;
}

interface Inschrijving extends BaseInfo {
  soort: Soort;
  detailSoort: Soort;
}
interface Adres {
  huisnummer: string;
  huisnummerToevoeging: string;
  postcode: string;
}

export interface Puntenmutatie extends BaseInfo {
  soort: Soort;
  omschrijving: string;
  gebeurtenissen: Gebeurtenissen[];
  situatiepunten: number;
  startpunten: number;
  zoekpunten: number;
}

export interface PointsCalc extends BaseInfo {
  datum: string;
  soort: Soort;
  inschrijving: Inschrijving;
  puntenmutaties: Puntenmutatie[];
  puntenDezeMaand: number;
  totaalPunten: number;
}
