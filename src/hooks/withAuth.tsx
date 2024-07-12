import { ComponentType } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

function withAuth<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
) {
  return function AuthenticatedComponent(props: Props) {
    const navigate = useRouter()
    const { data, status } = useSession()

    if (status !== 'loading' && data == null) {
      navigate.replace('/auth/signin')

      return null
    }

    return <WrappedComponent {...(props as any)} />
  }
}

export default withAuth
