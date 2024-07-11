import { useState } from 'react'

import withAuth from '@hooks/withAuth'
import ProgressBar from '@shared/ProgressBar'
import Terms from '@components/account/Terms'

const LAST_STEP = 2

function AccountNewPage() {
  const [step, setStep] = useState(0)

  return (
    <div>
      <ProgressBar progress={step / LAST_STEP} />
      {step === 0 ? <Terms /> : null}
    </div>
  )
}

export default withAuth(AccountNewPage)
