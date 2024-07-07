import { useRouter } from 'next/router'

import Text from '@shared/Text'
import Badge from '@shared/Badge'
import Button from '@shared/Button'
import ListRow from '@shared/ListRow'
import Skeleton from '@shared/Skeleton'
import withSuspense from '@shared/hocs/withSuspense'
import useCards from '@components/home/hooks/useCards'

function CardList() {
  const navigate = useRouter()
  const { data } = useCards()

  const isShowMoreButton = data?.items.length ?? 0 > 5

  return (
    <div style={{ padding: '24px 0' }}>
      <Text
        bold={true}
        style={{ display: 'inline-block', padding: '12px 24px' }}
      >
        추천 카드
      </Text>
      <ul>
        {data?.items.slice(0, 5).map((card, index) => {
          return (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts
                  title={`${index + 1}위`}
                  subtitle={`${card.corpName} ${card.name}`}
                />
              }
              right={
                card.payback != null ? <Badge label={card.payback} /> : null
              }
              withArrow={true}
              onClick={() => navigate.push(`/card/${card.id}`)}
            />
          )
        })}
      </ul>
      {isShowMoreButton ? (
        <div style={{ padding: '12px 24px 0 24px' }}>
          <Button
            size="medium"
            full={true}
            onClick={() => navigate.push('/card')}
          >
            더 보기
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export function CardListSkeleton() {
  return (
    <div style={{ padding: '24px 0' }}>
      <Text
        bold={true}
        style={{ display: 'inline-block', padding: '12px 24px' }}
      >
        추천 카드
      </Text>
      {[...new Array(5)].map((_, index) => (
        <ListRow
          key={index}
          contents={
            <ListRow.Texts
              title={<Skeleton width={30} height={25} />}
              subtitle={<Skeleton width={45} height={20} />}
            />
          }
        />
      ))}
    </div>
  )
}

export default withSuspense(CardList, { fallback: <CardListSkeleton /> })
