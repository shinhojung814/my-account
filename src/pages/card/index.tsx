import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { QueryClient, dehydrate, useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component'

import { getCards } from '@remote/card'

import Top from '@shared/Top'
import Input from '@shared/Input'
import Badge from '@shared/Badge'
import ListRow from '@shared/ListRow'

function CardListPage() {
  const navigate = useRouter()

  const {
    data,
    hasNextPage = false,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery(['cards'], ({ pageParam }) => getCards(pageParam), {
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
  })

  const loadMoreData = useCallback(() => {
    if (hasNextPage === false || isFetching === true) {
      return
    }

    fetchNextPage()
  }, [hasNextPage, isFetching, fetchNextPage])

  if (data == null) {
    return
  }

  const cards = data?.pages.map(({ items }) => items).flat()

  return (
    <div>
      <Top title="추천 카드" subtitle="회원님을 위한 추천 카드입니다." />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input
          onFocus={() => {
            navigate.push('/card/search')
          }}
        />
      </div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<ListRow.Skeleton />}
        next={loadMoreData}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, index) => {
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
      </InfiniteScroll>
    </div>
  )
}

export async function getServerSideProps() {
  const client = new QueryClient()

  await client.prefetchInfiniteQuery(['cards'], () => getCards())

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
    },
  }
}

export default CardListPage
