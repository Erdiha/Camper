import {
    collection,
    deleteDoc,
    doc,
    DocumentData,
    onSnapshot,
    setDoc
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useAuth from './authservice';
import { IData } from './types';
import { db } from '../firebaseAuth';
import {
    allLibraryItemsAtoms, atomModal, itemAddedOrRemoved, 
    libraryItemAtom, modalPark
} from '../recoil/atom';
 export default function libraryHelper(){
    const [added, setAdded] = useRecoilState(itemAddedOrRemoved);
    const [libraryItem, setLibraryItem] = useRecoilState(modalPark);
    const { currentUser } = useAuth();
    const [allLibrary, setAllLibrary] = useState<IData[] | DocumentData[]>([]);
   
    useEffect(() => {
      const found = allLibrary?.some((result: any) => {
        return result.data.id === libraryItem?.id;
      });
      setAdded(found);
    }, [allLibrary]);

    useEffect(() => {
      if (currentUser) {
        return onSnapshot(
          collection(db, 'users', currentUser.uid, 'myLib'),
          (snapshot) => setAllLibrary(snapshot.docs)
        );
      }
    }, [db, libraryItem?.id]);

    return {added,allLibrary}
 }
 
 

