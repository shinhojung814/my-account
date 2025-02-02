import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import { COLLECTIONS } from '@constants/collection'
import { Account } from '@models/account'
import { store } from '@remote/firebase'

export function setTerms({
  userId,
  termsIds,
}: {
  userId: string
  termsIds: string[]
}) {
  return setDoc(doc(collection(store, COLLECTIONS.TERMS), userId), {
    userId,
    termsIds,
  })
}

export async function getTerms(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.TERMS), userId),
  )

  if (snapshot.exists() === false) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as { userId: string; termsIds: string[] }),
  }
}

export async function getAccount(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.ACCOUNT), userId),
  )

  if (snapshot.exists() === false) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Account),
  }
}

export function createAccount(newAccount: Account) {
  return setDoc(
    doc(collection(store, COLLECTIONS.ACCOUNT), newAccount.userId),
    newAccount,
  )
}

export function updateAccountBalance(userId: string, balance: number) {
  const snapshot = doc(collection(store, COLLECTIONS.ACCOUNT), userId)

  return updateDoc(snapshot, { balance })
}

export function updateTerms(userId: string, termsIds: string[]) {
  const snapshot = doc(collection(store, COLLECTIONS.TERMS), userId)

  return updateDoc(snapshot, { termsIds })
}
