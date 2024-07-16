import Image from 'next/image'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { differenceInDays } from 'date-fns'

import { getPiggyBank } from '@remote/piggybank'
import withSuspense from '@hooks/withSuspense'
import useUser from '@hooks/useUser'
import addDelimiter from '@utils/addDelimiter'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import ListRow from '@shared/ListRow'

function PiggyBank({ pathname }: { pathname: string }) {
  const router = useRouter()
  const user = useUser()

  const { data } = useQuery(
    ['piggybank', user?.id],
    () => getPiggyBank(user?.id as string),
    { suspense: true },
  )

  if (data == null || data.length === 0) {
    return (
      <div>
        <ul>
          <ListRow
            left={
              <Image
                src="https://cdn1.iconfinder.com/data/icons/business-dual-color-glyph-set-3/128/fund_raising-256.png"
                alt="piggy-bank"
                width={40}
                height={40}
              />
            }
            contents={
              <ListRow.Texts
                title="저금통"
                subtitle="매일 조금씩 목표를 달성해보세요"
              />
            }
            withArrow={true}
            onClick={() => {
              router.push('/account/piggybank/new')
            }}
          />
        </ul>
      </div>
    )
  }

  const piggybanks = pathname === '/account' ? data.slice(0, 1) : data

  return (
    <div>
      <ul>
        {piggybanks.map((piggybank) => {
          const { id, name, balance, endDate, goalAmount } = piggybank
          const dday = differenceInDays(endDate, new Date())

          return (
            <ListRow
              key={id}
              left={
                <Image
                  src="https://cdn1.iconfinder.com/data/icons/business-dual-color-glyph-set-3/128/fund_raising-256.png"
                  alt="piggy-bank"
                  width={40}
                  height={40}
                  style={{ margin: '0 28px' }}
                />
              }
              contents={
                <Flex direction="column">
                  <Text typography="t4" bold={true}>
                    {name}
                  </Text>
                  <Text typography="t5" bold={true}>
                    D-{dday}
                  </Text>
                  <Text typography="t6">
                    목표까지 {addDelimiter(goalAmount - balance)}원 남았습니다.
                  </Text>
                </Flex>
              }
              withArrow={pathname === '/account' ? true : false}
              onClick={() => {
                router.push('/account/piggybank')
              }}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default withSuspense(PiggyBank, {
  fallback: <div>저금통을 불러오는 중</div>,
})
