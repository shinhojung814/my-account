import { signOut } from 'next-auth/react'

import Flex from '@shared/Flex'
import Button from '@shared/Button'
import withAuth from '@hooks/withAuth'

function MyPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <Flex justify="center">
        <Button onClick={() => signOut({ callbackUrl: '/' })}>로그아웃</Button>
      </Flex>
    </div>
  )
}

export default withAuth(MyPage)
