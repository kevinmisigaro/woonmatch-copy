export interface MraReactions {
  count: MraReactionsCount;
  events: MraReactionsEvents;
}

interface MraReactionsCount {
  thisMonth: number;
  nextMonth: number;
}

interface MraReactionsEvents {
  thisMonth: MraReactionsThisMonthEvent[];
  nextMonth: any[];
}

interface MraReactionsThisMonthEvent {
  source: string;
  order: string;
  contextId: string;
  reactionDate: string;
  corporation: string;
  advertDate: string;
  address: MraReactionHouseAddress;
}

interface MraReactionHouseAddress {
  zipcode: string;
  housenumber: string;
  street: string;
  city: string;
}
