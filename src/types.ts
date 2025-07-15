export interface Offer {
  id: string;
  name: string;
  brandId: string;
  locationsTotal: number;
}

export interface Location {
  id: string;
  address: string;
  brandId: string;
  hasOffer: boolean;
}