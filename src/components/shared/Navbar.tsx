import { useCallback } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { css } from '@emotion/react'

import Flex from '@shared/Flex'
import Button from '@shared/Button'
import { colors } from '@styles/colorPalette'

function Navbar() {
  const navigate = useRouter()
  const { data: session } = useSession()
  const showSignButton = ['/auth/signin'].includes(navigate.pathname) === false

  const renderButton = useCallback(() => {
    if (session != null) {
      return (
        <Link href="/my">
          <Image
            src={session.user?.image ?? ''}
            alt={(session.user?.name as string) ?? 'user-image'}
            width={40}
            height={40}
            style={{ borderRadius: '100%' }}
          />
        </Link>
      )
    }

    if (showSignButton) {
      return (
        <Link href="/auth/signin">
          <Button>로그인 / 회원가입</Button>
        </Link>
      )
    }

    return null
  }, [session, showSignButton])

  return (
    <Flex justify="space-between" align="center" css={navbarStyles}>
      <Link href="/">MyAccount</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarStyles = css`
  position: sticky;
  top: 0;
  padding: 10px 24px;
  background-color: ${colors.white};
  border-bottom: solid 1px ${colors.gray100};
  z-index: 10;
`

export default Navbar
