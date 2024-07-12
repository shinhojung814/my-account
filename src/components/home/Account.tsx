import Link from 'next/link'
import Image from 'next/image'

import useUser from '@hooks/useUser'
import useAccount from '@hooks/useAccount'
import addDelimiter from '@utils/addDelimiter'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'

function Account() {
  const user = useUser()
  const { data: account } = useAccount()

  if (account == null) {
    return (
      <div style={{ padding: 24 }}>
        <Flex justify="space-between">
          <Flex direction="column">
            <Text bold={true} style={{ whiteSpace: 'pre-wrap' }}>
              {`계좌 개설이 \n더 쉽고 빨라졌어요.`}
            </Text>
            <Spacing direction="vertical" size={4} />
            <Text
              typography="t6"
              color="gray700"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {`간편하게 계좌를 \n개설해보세요.`}
            </Text>
            <Spacing direction="vertical" size={8} />
            <Link href="/account/new">
              <Button>1분 만에 계좌 개설</Button>
            </Link>
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

  if (account.status === 'READY') {
    return (
      <div style={{ padding: 24 }}>
        <Flex justify="space-between">
          <Flex direction="column">
            <Text bold={true} style={{ whiteSpace: 'pre-wrap' }}>
              신청하신 계좌의 개설이 진행 중입니다.
            </Text>
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

  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text typography="t6" color="gray800" bold={true}>
            {user?.name} 회원님의 자산
          </Text>
          <Spacing direction="vertical" size={8} />
          <Text typography="t3" bold={true}>
            {addDelimiter(account.balance)} 원
          </Text>
        </Flex>
        <Button>분석</Button>
      </Flex>
    </div>
  )
}

export default Account
