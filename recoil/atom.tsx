import { DocumentData } from 'firebase/firestore';
import { atom } from 'recoil';
import { IData } from '../data/types';
export const InputSearch = atom({
  key: 'InputSearch',
  default: 'CA',
});
//controlls modal an and off
export const atomModal = atom({
  key: 'atomModal',
  default: false,
});
//controls the park we display in the modal
export const modalPark = atom<null | IData | DocumentData>({
  key: 'modalPark',
  default: null,
});
//check if the item is added or removed from my places
export const itemAddedOrRemoved = atom({
  key: 'itemAddedOrRemoved',
  default: false
});

export const navItemBackground = atom({
  key: "navItemBackground",
  default: false
})

