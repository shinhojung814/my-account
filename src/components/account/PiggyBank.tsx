import Image from 'next/image'
import { useRouter } from 'next/router'

import ListRow from '@shared/ListRow'

function PiggyBank() {
  const navigate = useRouter()

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
            navigate.push('/account/piggybank/new')
          }}
        />
      </ul>
    </div>
  )
}

export default PiggyBank
