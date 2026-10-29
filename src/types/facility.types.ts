export type TFacility = {
  _id?: string;
  id?: string;
  name: string;
  sport: string;
  image: string;
  location: string;
  // The server stores form values as strings, so accept both.
  pricePerHour: number | string;
  capacity?: number | string;
  description?: string;
  rating?: number;
  reviews?: number;
};
