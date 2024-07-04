import Head from 'next/head'

import SEO from '@shared/SEO'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SEO title="MyAccount" description="보다 간편한 자산 관리" image="" />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </div>
  )
}
