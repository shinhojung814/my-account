import Image from 'next/image'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'

function Account() {
  const hasAccount = true

  if (hasAccount) {
    return (
      <div style={{ padding: 24 }}>
        <Flex justify="space-between" align="center">
          <Flex direction="column">
            <Text typography="t6" color="gray600">
              정토뭉 회원님의 자산
            </Text>
            <Spacing direction="vertical" size={8} />
            <Text typography="t3" bold={true}>
              123,456 원
            </Text>
          </Flex>
          <Button>분석</Button>
        </Flex>
      </div>
    )
  }

  const AccountStatus = 'READY'
  const title =
    AccountStatus === 'READY'
      ? '계좌의 개설이 \n진행 중입니다.'
      : '간편하게 계좌를 \n개설해보세요.'
  const buttonLabel =
    AccountStatus === 'READY' ? '이어서 신청하기' : '새로운 계좌 신청'

  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between">
        <Flex direction="column">
          <Text bold={true} style={{ whiteSpace: 'pre-wrap' }}>
            {title}
          </Text>
          <Spacing direction="vertical" size={8} />
          <Button>{buttonLabel}</Button>
        </Flex>
        <Image
          src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-16-512.png"
          alt="asset"
          width={80}
          height={80}
        />
      </Flex>
    </div>
  )
}

export default Account
