import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { Global } from '@emotion/react'

import globalStyles from '@styles/globalStyles'
import Layout from '@shared/Layout'

export default function App({
  Component,
  pageProps: { dehydratedState, ...pageProps },
}: AppProps) {
  const client = new QueryClient()

  return (
    <Layout>
      <QueryClientProvider client={client}>
        <Global styles={globalStyles} />
        <Hydrate state={dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </Layout>
  )
}
