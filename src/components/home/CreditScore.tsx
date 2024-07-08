import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import Skeleton from '@shared/Skeleton'
import CreditScoreChart from '@shared/CreditScoreChart'

function CreditScore() {
  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text bold={true}>
            나의 신용도를 확인하고 <br />
            신용 점수를 올리세요
          </Text>
          <Spacing direction="vertical" size={12} />
          <Button>내 신용점수 확인하기</Button>
        </Flex>
        <CreditScoreChart score={500} width={80} height={80} />
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
