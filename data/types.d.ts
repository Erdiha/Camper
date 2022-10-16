export interface IData {
  id: string;
  activities: [];
  addresses: [];
  url: string;
  fullName: string;
  description: string;
  contacts: [];
  desgnation: string;
  directionsInfo: string;
  directionsUrl: string;
  entrenceFees: [];
  images: [];
  operatingHours: [];
  topics: [];
  weatherInfo: string;
}
export interface IPark {
  park: IData[] | null;
}
