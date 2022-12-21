export interface Metadata {
  calculationDate: string;
  eventsUntil: string;
  eventsFrom: string;
  origin: string;
}

export interface Type {
  code: string;
  name: string;
  friendlytext: string;
  description?: string;
}

interface Address {
  street: string;
  zipcode: string;
  housenumber: string;
  city: string;
}

export interface RelatedEvent {
  metadata: Metadata;
  date: string;
  type: Type;
  address: Address;
}

export interface PointChanges {
  situation: number;
  start: number;
  search: number;
}

export interface EventCategory {
  relatedEvents: RelatedEvent[];
  pointChanges: PointChanges;
  type: Type;
}

export interface Points {
  situation: number;
  totalNewThisMonth: number;
  start: number;
  total: number;
  search: number;
  waitingAtStart: number;
}

export interface PointsCalculations {
  metadata: Metadata;
  eventCategories: EventCategory[];
  points: Points;
  type: Type;
}
