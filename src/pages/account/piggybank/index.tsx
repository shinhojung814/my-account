import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import PiggyBank from '@components/account/PiggyBank'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

function PiggyBankPage() {
  const router = useRouter()
  const pathname = router.pathname.toString()

  return (
    <div style={{ padding: 24 }}>
      <PiggyBank pathname={pathname} />
      <FixedBottomButton
        label="새로운 저금통 추가"
        onClick={() => router.push('/account/piggybank/new')}
      />
    </div>
  )
}

export default PiggyBankPage
