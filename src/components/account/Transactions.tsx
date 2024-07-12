import Link from 'next/link'
import { parseISO, format } from 'date-fns'

import withSuspense from '@hooks/withSuspense'
import addDelimiter from '@utils/addDelimiter'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import ListRow from '@shared/ListRow'
import useTransactions from '@components/account/hooks/useTransactions'

function Transactions() {
  const { data } = useTransactions({ suspense: true })

  const transactions = data?.pages
    .map(({ items }) => items)
    .flat()
    .slice(0, 5)

  return (
    <div>
      <Text bold={true} style={{ padding: 24 }}>
        입출금 내역
      </Text>
      <Spacing direction="vertical" size={36} />
      {transactions?.length === 0 ? (
        <Flex style={{ padding: 24 }}>
          <Text>회원님의 입출금 내역이 존재하지 않습니다.</Text>
        </Flex>
      ) : (
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
      )}
      <Spacing direction="vertical" size={24} />
      <div style={{ padding: 24 }}>
        <Link href="/account/transactions">
          <Button full={true} size="medium" weak={true}>
            자세히 보기
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default withSuspense(Transactions, {
  fallback: <div>입출금 내역을 불러오는 중</div>,
})
