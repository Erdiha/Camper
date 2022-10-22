import { DocumentData } from 'firebase/firestore';
export interface IData  {
  id: string;
  activities: [];
  addresses: [
    {
      postalCode: number,
      city: string,
      stateCode: string,
      line1: string,
      type: string,
      line3: any,
      line2: any,
    }
  ];
  url: string;
  fullName: string;
  description: string;
  contacts: {
    emailAddresses: [{ description: string, emailAddress: string }];
    phoneNumbers: [{ phoneNumber: string }];
  };
  directionsInfo: string;
  directionsUrl: string;
  entranceFees: [];
  images: [
    {
      title:string,
      altText:string,
      caption:String,
      url:string
    }
  ];
  operatingHours: [];
  topics: [];
  weatherInfo: string;
  name: string;
}
export interface IPark {
  park: IData[];
}
