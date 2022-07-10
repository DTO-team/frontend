import { projectFirestore } from '../config';
import { generateUniqSerial } from 'utils/uuid';

export const setCollection = () => {
  const addDocWithID = async (
    collection: string,
    subCollection: string,
    doc: any,
    userID: string
  ) => {
    try {
      const res = await projectFirestore
        .collection(collection)
        .doc(userID)
        .collection(subCollection)
        .doc(generateUniqSerial())
        .set({
          ...doc,
          seen: false
        });
    } catch (err) {
      console.log(err);
    }
  };

  const updateSeenMessageField = async (
    collection: string,
    subCollection: string,
    userID: string
  ) => {
    try {
      await projectFirestore
        .collection(collection)
        .doc(userID)
        .collection(subCollection)
        .doc(generateUniqSerial())
        .update({
          seen: true
        });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    addDocWithID,
    updateSeenMessageField
  };
};
