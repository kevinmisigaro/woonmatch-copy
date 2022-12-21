import { proxy } from "valtio";
import { House } from "../interfaces/index";
import { xhrRequest } from "../network/network";

export interface HouseStore {
  houses: Array<House> | null;
  getHouses: () => Array<House> | null;
  setHouse: (houses: Array<House>) => void;
  fetchHouse: () => void;
}

export const houseStore = proxy<HouseStore>({
  houses: null,
  getHouses: (): Array<House> | null => {
    return houseStore.houses;
  },
  setHouse: (houses: Array<House>) => {
    houseStore.houses = houses;
  },
  fetchHouse: async () => {
    let endpoint =
      localStorage.getItem("token") !== null
        ? "/houses/private"
        : "/houses/public";

    const response = await xhrRequest<Array<House>>("GET", {
      endPoint: endpoint,
    });

    //console.log("houses", response);

    if (response) {
      houseStore.setHouse(response.data);
    }
  },
});
