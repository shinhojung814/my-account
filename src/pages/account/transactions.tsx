import { useState, useCallback } from 'react'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { QueryClient, dehydrate } from 'react-query'
import { parseISO, format } from 'date-fns'
import InfiniteScroll from 'react-infinite-scroll-component'

import { User } from '@models/user'
import { TransactionFilterType } from '@models/transaction'
import { getTransactions } from '@remote/transaction'
import withAuth from '@hooks/withAuth'
import addDelimiter from '@utils/addDelimiter'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import ListRow from '@shared/ListRow'
import useTransactions from '@components/account/hooks/useTransactions'

const FILTERS: Array<{ label: string; value: TransactionFilterType }> = [
  { label: '전체', value: 'all' },
  { label: '입금', value: 'deposit' },
  { label: '출금', value: 'withdraw' },
]

function TransactionsPage() {
  const [currentFilter, setCurrentFilter] =
    useState<TransactionFilterType>('all')

  const {
    data,
    hasNextPage = false,
    isFetching,
    fetchNextPage,
  } = useTransactions({ filter: currentFilter })

  const loadMoreData = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [hasNextPage, isFetching, fetchNextPage])

  const transactions = data?.pages.map(({ items }) => items).flat() ?? []

  return (
    <div style={{ padding: '24px 12px' }}>
      <Flex as="ul" justify="flex-end" style={{ padding: 24, gap: 6 }}>
        {FILTERS.map((filter) => (
          <li
            key={filter.value}
            onClick={() => setCurrentFilter(filter.value)}
            style={{ fontWeight: filter.value === currentFilter ? 800 : 400 }}
          >
            {filter.label}
          </li>
        ))}
      </Flex>
      <InfiniteScroll
        dataLength={transactions.length}
        hasMore={hasNextPage}
        next={loadMoreData}
        loader={<></>}
        scrollThreshold="100px"
      >
        <ul>
          {transactions?.map((transaction) => {
            const isTypeDeposit = transaction.type === 'deposit'

            return (
              <ListRow
                key={transaction.id}
                contents={
                  <ListRow.Texts
                    title={transaction.displayText}
                    subtitle={format(
                      parseISO(transaction.date),
                      'yyyy-MM-dd HH:mm:SS',
                    )}
                  />
                }
                right={
                  <Flex direction="column" align="flex-end">
                    <Text color={isTypeDeposit ? 'blue' : 'red'} bold={true}>
                      {isTypeDeposit ? '+' : '-'}{' '}
                      {addDelimiter(transaction.amount)} 원
                    </Text>
                    <Text typography="t6" color="gray700">
                      {addDelimiter(transaction.balance)} 원
                    </Text>
                  </Flex>
                }
              />
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchInfiniteQuery(
      ['transactions', (session.user as User)?.id, 'all'],
      () =>
        getTransactions({
          userId: (session.user as User)?.id as string,
          filter: 'all',
        }),
    )

    return {
      props: {
        dehydrateState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}

export default withAuth(TransactionsPage)
