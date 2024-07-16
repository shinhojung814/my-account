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

  const piggybanks = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...(doc.data() as PiggyBank),
      startDate: doc.data().startDate.toDate(),
      endDate: doc.data().endDate.toDate(),
    }
  })

  return piggybanks
}

export function createPiggyBank(newPiggyBank: PiggyBank) {
  return setDoc(doc(collection(store, COLLECTIONS.PIGGYBANK)), newPiggyBank)
}
