import { useRef, useEffect, useState, useCallback, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { getSearchCards } from '@remote/card'
import Top from '@shared/Top'
import Text from '@shared/Text'
import Input from '@shared/Input'
import Badge from '@shared/Badge'
import Spacing from '@shared/Spacing'
import ListRow from '@shared/ListRow'
import useDebounce from '@hooks/useDebounce'

function SearchPage() {
  const router = useRouter()

  const [keyword, setKeyword] = useState('')

  const debouncedKeyword = useDebounce(keyword)

  const inputRef = useRef<HTMLInputElement>(null)

  const { data } = useQuery(
    ['cards', debouncedKeyword],
    () => getSearchCards(debouncedKeyword),
    {
      enabled: debouncedKeyword !== '',
    },
  )

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  })

  const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, [])

  return (
    <div>
      <Top title="추천 카드" subtitle="회원님을 위한 추천 카드입니다." />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input ref={inputRef} value={keyword} onChange={handleKeyword} />
      </div>
      {keyword !== '' && data?.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', padding: 36 }}>
          <Text>입력하신 검색어와 일치하는 카드가 없습니다.</Text>
          <Spacing direction="vertical" size={4} />
          <Text typography="t6" color="gray700">
            다른 검색어를 입력하시거나 철자와 띄어쓰기를 확인해보세요.
          </Text>
        </div>
      ) : (
        <ul>
          {data?.map((card, index) => {
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
                onClick={() => router.push(`/card/${card.id}`)}
              />
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default SearchPage
