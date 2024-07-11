import Link from 'next/link'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import Skeleton from '@shared/Skeleton'
import CreditScoreChart from '@shared/CreditScoreChart'
import useCredit from '@components/credit/hooks/useCredit'

function CreditScore() {
  const { data, isLoading } = useCredit()

  if (isLoading) {
    return <CreditScoreSkeleton />
  }

  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text bold={true}>
            나의 신용도를 확인하고 <br />
            신용점수를 올리세요
          </Text>
          <Spacing direction="vertical" size={12} />
          <Link href="/credit">
            <Button>내 신용점수 확인하기</Button>
          </Link>
        </Flex>
        <CreditScoreChart
          score={data?.creditScore ?? 0}
          width={80}
          height={80}
        />
      </Flex>
    </div>
  )
}

export function CreditScoreSkeleton() {
  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Skeleton width={155} height={50} />
          <Spacing direction="vertical" size={12} />
          <Skeleton width={155} height={30} />
        </Flex>
      </Flex>
    </div>
  )
}

export default CreditScore
