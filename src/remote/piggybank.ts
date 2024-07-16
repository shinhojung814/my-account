import {
  collection,
  doc,
  query,
  where,
  limit,
  orderBy,
  setDoc,
  getDocs,
} from 'firebase/firestore'

import { store } from '@remote/firebase'
import { PiggyBank } from '@models/piggybank'
import { COLLECTIONS } from '@constants/collection'

export async function getPiggyBank(userId: string) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.PIGGYBANK),
      where('userId', '==', userId),
      where('endDate', '>=', new Date()),
      orderBy('endDate', 'asc'),
    ),
  )

  if (snapshot.docs.length === 0) {
    return null
  }

  const piggybank = snapshot.docs[0].data()

  return {
    id: snapshot.docs[0].id,
    ...(piggybank as PiggyBank),
    startDate: piggybank.startDate.toDate(),
    endDate: piggybank.endDate.toDate(),
  }
}

export function createPiggyBank(newPiggyBank: PiggyBank) {
  return setDoc(doc(collection(store, COLLECTIONS.PIGGYBANK)), newPiggyBank)
}
