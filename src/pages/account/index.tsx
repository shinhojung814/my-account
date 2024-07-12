import dynamic from 'next/dynamic'

import withAuth from '@hooks/withAuth'

const Transactions = dynamic(() => import('@components/account/Transactions'))

function AccountPage() {
  return (
    <div style={{ padding: '24px 12px' }}>
      <Transactions />
    </div>
  )
}

export default withAuth(AccountPage)
