import { atom } from "jotai";

export const houseRegisterStep = atom<number>(0);
export const addHouseRegisterStep = atom<number>(
  (get) => get(houseRegisterStep) + 1
);
export const removeHouseRegisterStep = atom<number>(
  (get) => get(houseRegisterStep) - 1
);

export const houseRegisterValuesAtom = atom({
  addressMe: "",
  lastname: "",
  initials: "",
  dob: "",
  postcode: "",
  houseNo: "",
  street: "",
  residence: "",
  income: "",
  registerWithSomeoneElse: false,
  doesYourPartnerHaveRegistration: false,
  partnerEmail: "",
  partnerDob: "",
  regNumber: "",
  partnerRegNo: "",
  partnerLastName: "",
  partnerInitials: "",
  owerOccupiedHome: false,
  rentedHouse: false,
  leaveCurrentHome: false,
  place: "",
  radius: "",
  typeofproperty: "",
  minNoOfRooms: "",
  tipServices: false,
});
