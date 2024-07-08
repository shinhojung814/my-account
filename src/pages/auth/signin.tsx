import {
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
  signIn,
} from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

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
    <div>
      <Spacing direction="vertical" size={60} />
      <Flex direction="column" align="center">
        <Text bold={true}>My Account</Text>
        <Spacing direction="vertical" size={60} />
        <ul>
          {Object.values(providers).map((provider) => (
            <li key={provider.id}>
              <Button
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >{`${provider.name} Sign In`}</Button>
            </li>
          ))}
        </ul>
      </Flex>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  console.log('providers', providers)

  return {
    props: {
      providers,
    },
  }
}

export default SigninPage
