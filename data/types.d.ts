export type IData = {
  id: string;
  activities: [];
  addresses: [
    {
      postalCode: number;
      city: string;
      stateCode: string;
      line1: string;
      type: string;
      line3: any;
      line2: any;
    }
  ];
  url: string;
  fullName: string;
  description: string;
  contacts: [];
  directionsInfo: string;
  directionsUrl: string;
  entranceFees: [];
  images: [];
  operatingHours: [];
  topics: [];
  weatherInfo: string;
  name: string;
};
export interface IPark {
  park: IData | null | any;
}
