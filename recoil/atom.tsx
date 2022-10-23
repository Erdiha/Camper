import { DocumentData } from 'firebase/firestore';
import { atom } from 'recoil';
import { IData, IPark } from '../data/types';
export const InputSearch = atom({
  key: 'InputSearch',
  default: 'CA',
});

export const atomModal = atom({
  key: 'atomModal',
  default: false,
});

export const modalPark = atom<null | IData | DocumentData>({
  key: 'modalPark',
  default: null,
});

export const libraryItemAtom = atom<null | IData | DocumentData>({
  key: 'libraryItemAtom',
  default:null
})
export const allLibraryItemsAtoms = atom<null | [] | DocumentData[]>({
  key: 'allLibraryItemsAtoms',
  default: null,
});

export const itemAddedOrRemoved = atom({
  key: 'itemAddedOrRemoved',
  default: false
});

export const heroPhotos = atom<[] | null>({
  key:"heroPhotos",
  default:null
})

