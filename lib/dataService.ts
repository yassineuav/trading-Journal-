import { database } from './firebase';
import { ref, set, get, remove } from 'firebase/database';

const dbRef = ref(database, 'data/');

export const createData = async (data: any) => {
//   const newDataRef = ref(database, `data/${data.id}`);
  const newDataRef = ref(database, `data`);
  return set(newDataRef, data);
};

export const readData = async () => {
  const snapshot = await get(dbRef);
  return snapshot.val();
};

export const updateData = async (data: any) => {
  const dataRef = ref(database, `data/${data.id}`);
  return set(dataRef, data);
};

export const deleteData = async (id: string) => {
  const dataRef = ref(database, `data/${id}`);
  return remove(dataRef);
};


export const deleteDataAll = async () => {
    const dataRef = ref(database, `data`);
    return remove(dataRef);
  };