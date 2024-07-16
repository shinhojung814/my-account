import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'

import Flex from '@shared/Flex'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import ListRow from '@shared/ListRow'
import withAuth from '@hooks/withAuth'

function MyPage() {
  const router = useRouter()

  return (
    // <div
    //   style={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: '80vh',
    //   }}
    // >
    //   <Flex justify="center">
    //     <Button onClick={() => signOut({ callbackUrl: '/' })}>로그아웃</Button>
    //   </Flex>
    // </div>
    <div>
      <Spacing direction="vertical" size={100} />
      <Flex justify="center">
        <Button onClick={() => signOut({ callbackUrl: '/' })}>로그아웃</Button>
      </Flex>
      <Spacing
        direction="vertical"
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <ul>
        <ListRow
          contents={<ListRow.Texts title="약관" subtitle="약관 목록 및 철회" />}
          onClick={() => {
            router.push('/settings/terms')
          }}
          withArrow={true}
        />
      </ul>
    </div>
  )
}

export default withAuth(MyPage)
