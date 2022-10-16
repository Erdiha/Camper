import { atom } from 'recoil';
import { IData, IPark } from '../data/types';
export const InputSearch = atom({
  key: 'InputSearch',
  default: 'CA',
});

export const modalPark = atom<null | IData[]>({
  key: 'modalPark',
  default: null,
});
