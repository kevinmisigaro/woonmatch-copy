// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export interface User {
  income: number;
  registrationnumber: string;
  letterhead: string;
  lastname: string;
  street: string;
  zipcode: string;
  housenumber: string;
  initials: string;
  dob: string;
  cc_email: string;
  city: string;
  phone: Phone;
  email: string;
}

export interface Phone {
  mobile?: string;
  landline?: string;
}

export interface House {
  geodata: Geodata;
  advert: string;
  friendlyAdvertType: string;
  reactionCount: number;
  requirements: Requirements;
  files: Files;
  corporation: Corporation;
  surface?: Surface;
  type: string;
  period: Period;
  title: string;
  address: Address;
  details: Details;
  description: any;
  match: any;
}

export interface Geodata {
  longitude: number;
  latitude: number;
}

export interface Requirements {
  income: Income;
  household: Household;
  age: Age;
}

export interface Income {
  min: any;
  enforced: boolean;
  max: any;
}

export interface Household {
  min: any;
  enforced: boolean;
  max: any;
}

export interface Age {
  min: any;
  enforced: boolean;
  max: any;
}

export interface Files {
  images: Image[];
  documents: Document[];
  thumbnail: string;
}

export interface Image {
  url: string;
  description: string;
}

export interface Document {
  url: string;
  type: string;
  description: string;
}

export interface Corporation {
  image: string;
  name: string;
}

export interface Surface {
  roomCount: string;
  rooms: Room[];
  total: number;
}

export interface Room {
  name: string;
  surface: string;
}

export interface Period {
  start: string;
  runtime: string;
  end: string;
}

export interface Address {
  number: string;
  street: string;
  zipcode: string;
  city: string;
  housenumber?: string;
}

export interface Details {
  servicecosts: string;
  mraSituationPointsApplicable: boolean;
  rent: string;
  buildYear?: number;
  rentDate?: string;
  options?: any[];
  code: string;
  energyScore: string;
  energylabel: string;
  bannerlist: string[];
  grossrent: string;
  bedrooms: number;
  floor: number;
  advertTexts?: string[];
  surface: string;
  type: string;
  title: string;
  youtubeEmbedCode?: string;
  description?: any;
  facilities?: any[];
  hasGarden: boolean;
  viewingDate: string;
  viewingType: string;
}

export interface ProfileSummary {
  situation: Situation;
  extraPeople: ExtraPeople;
  grossincome: number;
  person: Person;
  partner: Partner;
  address: Address;
}

export interface Situation {
  advice: Advice;
  doorstromer: Doorstromer;
  spoedzoeker: Spoedzoeker;
  payment: Payment;
}

export interface Advice {
  text: string;
  maxrent: string;
}

export interface Doorstromer {
  show: boolean;
  status: boolean;
}

export interface Spoedzoeker {
  show: boolean;
  status: boolean;
}

export interface Payment {
  show: number;
  complete: boolean;
  canpay: boolean;
}

export interface ExtraPeople {
  count: number;
  info: any[];
}

export interface Person {
  registrationnumber: string;
  searchdate: string;
  lastname: string;
  initials: string;
  dob: string;
  searchpoints: number;
}

export interface Partner {
  registrationnumber: string;
  searchdate: string;
  lastname: string;
  initials: string;
  dob: string;
  hasPartner: boolean;
  searchpoints: number;
}

export interface Preferences {
  rent: Rent;
  tipme: boolean;
  currentSettings: CurrentSettings;
  cities: City[];
  radius: number;
  communication: Communication[];
  rooms: number;
  models: Model[];
}

export interface Rent {
  min: number;
  max: number;
}

export interface CurrentSettings {
  rent: Rent2;
  tipme: boolean;
  cities: any[];
  radius: number;
  communication: any[];
  rooms: number;
  models: any[];
}

export interface Rent2 {
  min: number;
  max: number;
}

export interface City {
  children: any[];
  text: string;
  chosen: boolean;
  value: string;
}

export interface Communication {
  text: string;
  type: string;
  chosen: boolean;
  value: string;
}

export interface Model {
  text: string;
  ord: number;
  chosen: boolean;
  value: string;
}

export interface PartnerDetails {
  income: number;
  registrationnumber: string;
  letterhead: string;
  lastname: string;
  street: string;
  zipcode: string;
  housenumber: string;
  initials: string;
  dob: string;
  exists: boolean;
  cc_email: string;
  city: string;
  phone: Phone;
  email: string;
}

export interface Archive {
  onSite: OnSite[];
  inProgress: InProgress[];
  history: History[];
}

export interface SubmissionStatus {
  files?: any;
  canBeRedacted?: boolean;
  advert?: string;
  position?: number;
  img?: string;
  regDate?: string;
  type?: string;
  bonus?: string;
  runtime?: string;
  title?: string;
  periodEnd?: string;
  address?: Address;
  details?: ArchiveDetails;
}

export interface OnSite {
  advert: string;
  position: number;
  img: string;
  regDate: string;
  type: string;
  bonus: string;
  runtime: string;
  title: string;
  periodEnd: string;
  address: Address;
  details: ArchiveDetails;
}

export interface InProgress {
  canBeRedacted: boolean;
  advert: string;
  position: number;
  img: string;
  regDate: string;
  letters: Letter[];
  state: string;
  type: string;
  bonus: string;
  title: string;
  periodEnd: string;
  address: Address;
  details: ArchiveDetails;
}

export interface Letter {
  name: string,
  regdate: string,
  type: string,
  advert: LetterAdvert
}

export interface LetterAdvert {
  status: LetterStatus
}

export interface LetterStatus {
  hasReacted: boolean,
  canReact: boolean,
  canAccept: boolean,
  willAttendMeeting: boolean,
  hasRefused: boolean,
  reaction: string
}

export interface ArchiveDetails {
  energyScore?: string;
  servicecosts: string;
  rent: string;
  grossrent: string;
  bedrooms: number;
  surface: string;
  type: string;
}

export interface History {
  advert: string;
  position: number;
  img: string;
  regDate: string;
  letters: Letter[];
  state: string;
  type: string;
  bonus: string;
  periodEnd: string;
  address: Address;
  details: ArchiveDetails;
  title?: string;
}

export interface Question {
  question: string;
  answer: string;
  id: string;
}

export interface Documenten {
  groups: Group[];
  canDelete: boolean;
}

export interface Group {
  required: boolean;
  currentPartnerDocumentCount: number;
  isBasic: boolean;
  currentDocumentCount: number;
  types: Type[];
  name: string;
  id: string;
  description: string;
}

export interface Type {
  currentDocuments: any[];
  example: string;
  popup: string;
  name: string;
  id: string;
  description: string;
}
