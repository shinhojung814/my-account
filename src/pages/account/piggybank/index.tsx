import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import useUser from '@hooks/useUser'
import PiggyBank from '@components/account/PiggyBank'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'))

function PiggyBankPage() {
  const navigate = useRouter()
  const user = useUser()

  return (
    <div style={{ padding: 24 }}>
      <PiggyBank />
      <FixedBottomButton
        label="새로운 저금통 추가"
        onClick={() => navigate.push('/account/piggybank/new')}
      />
    </div>
  )
}

export default PiggyBankPage
