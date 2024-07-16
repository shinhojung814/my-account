import { collection, doc, setDoc } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { PiggyBank } from '@models/piggybank'
import { COLLECTIONS } from '@constants/collection'

export function createPiggyBank(newPiggyBank: PiggyBank) {
  return setDoc(doc(collection(store, COLLECTIONS.PIGGYBANK)), newPiggyBank)
}
