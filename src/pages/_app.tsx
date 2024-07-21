import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { Global } from '@emotion/react'

import globalStyles from '@styles/globalStyles'
import Layout from '@shared/Layout'
import Navbar from '@shared/Navbar'
import ErrorBoundary from '@shared/ErrorBoundary'
import { AlertContextProvider } from '@contexts/AlertContext'
import AuthGuard from '@components/auth/AuthGuard'

export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  const client = new QueryClient({})

  return (
    <Layout>
      <Global styles={globalStyles} />
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <Hydrate state={dehydratedState}>
            <ErrorBoundary>
              <AlertContextProvider>
                <AuthGuard>
                  <Navbar />
                  <Component {...pageProps} />
                </AuthGuard>
              </AlertContextProvider>
            </ErrorBoundary>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
