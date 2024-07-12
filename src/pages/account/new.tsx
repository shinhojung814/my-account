import { useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'

import { getTerms, setTerms } from '@remote/account'
import { User } from '@models/user'
import withAuth from '@hooks/withAuth'
import useUser from '@hooks/useUser'
import ProgressBar from '@shared/ProgressBar'
import Terms from '@components/account/Terms'

const LAST_STEP = 2

function AccountNewPage({ initialStep }: { initialStep: number }) {
  const [step, setStep] = useState(initialStep)
  const user = useUser()

  return (
    <div>
      <ProgressBar progress={step / LAST_STEP} />
      {step === 0 ? (
        <Terms
          onNext={async (termsIds) => {
            await setTerms({ userId: user?.id as string, termsIds })

            setStep((prevStep) => prevStep + 1)
          }}
        />
      ) : null}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  const agreedTerms = await getTerms((session?.user as User).id)

  if (agreedTerms == null) {
    return {
      props: {
        initialStep: 0,
      },
    }
  }

  if (agreedTerms != null) {
    return {
      props: {
        initialStep: 1,
      },
    }
  }

  return {
    props: {
      initialStep: 0,
    },
  }
}

export default withAuth(AccountNewPage)
