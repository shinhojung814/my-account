import Image from 'next/image'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'

function NotFoundPage() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Flex direction="column" align="center">
        <Image
          src="https://cdn3.iconfinder.com/data/icons/network-and-communications-10/32/network_Error_lost_no_page_not_found-512.png"
          alt="404"
          width={80}
          height={80}
        />
        <Spacing direction="vertical" size={20} />
        <Text>페이지가 존재하지 않습니다.</Text>
        <Spacing direction="vertical" size={60} />
        <Button
          onClick={() => {
            window.history.back()
          }}
        >
          돌아가기
        </Button>
      </Flex>
    </div>
  )
}

export default NotFoundPage
