import Image from 'next/image'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'

function FullPageLoader({ message }: { message?: string }) {
  return (
    <Flex
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      justify="center"
      align="center"
    >
      <Flex direction="column" align="center">
        <Image
          src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-47-323_512.gif"
          alt="loading"
          width={120}
        />
        {message != null ? (
          <>
            <Spacing size={40} />
            <Text typography="t4" bold={true}>
              {message}
            </Text>
          </>
        ) : null}
      </Flex>
    </Flex>
  )
}

export default FullPageLoader
