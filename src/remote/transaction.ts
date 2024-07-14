import {
  collection,
  doc,
  query,
  where,
  limit,
  setDoc,
  getDocs,
  orderBy,
  startAfter,
  QuerySnapshot,
} from 'firebase/firestore'

import { COLLECTIONS } from '@constants/collection'
import {
  Transaction,
  TransactionType,
  TransactionFilterType,
} from '@models/transaction'
import { store } from '@remote/firebase'

export function createTransaction(newTransaction: Transaction) {
  return setDoc(doc(collection(store, COLLECTIONS.TRANSACTION)), newTransaction)
}

export async function getTransactions({
  userId,
  pageParam,
  filter = 'all',
}: {
  userId: string
  pageParam?: QuerySnapshot<TransactionType>
  filter?: TransactionFilterType
}) {
  const transactionQuery = generateQuery({ userId, pageParam, filter })

  const transactionSnapshot = await getDocs(transactionQuery)

  const lastVisible =
    transactionSnapshot.docs[transactionSnapshot.docs.length - 1]

  const items = transactionSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Transaction),
  }))

  return { items, lastVisible }
}

function generateQuery({
  userId,
  pageParam,
  filter,
}: {
  userId: string
  pageParam?: QuerySnapshot<TransactionType>
  filter?: TransactionFilterType
}) {
  const baseQuery = query(
    collection(store, COLLECTIONS.TRANSACTION),
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(15),
  )

  if (filter !== 'all') {
    if (pageParam == null) {
      return query(baseQuery, where('type', '==', filter))
    }

    return query(baseQuery, startAfter(pageParam), where('type', '==', filter))
  } else {
    if (pageParam == null) {
      return baseQuery
    }

    return query(baseQuery, startAfter(pageParam))
  }
}
