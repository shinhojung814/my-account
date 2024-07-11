import {
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
  signIn,
} from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'

function SigninPage({
  providers,
}: {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <Flex direction="column" align="center">
        <Text bold={true}>My Account</Text>
        <Spacing direction="vertical" size={40} />
        <ul>
          {Object.values(providers).map((provider) => (
            <li key={provider.id}>
              <Button
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >{`${provider.name} 로그인`}</Button>
            </li>
          ))}
        </ul>
      </Flex>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default SigninPage
