import { useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'

import { getTerms, setTerms, getAccount, createAccount } from '@remote/account'
import { Account } from '@models/account'
import { User } from '@models/user'
import withAuth from '@hooks/withAuth'
import useUser from '@hooks/useUser'
import ProgressBar from '@shared/ProgressBar'
import FullPageLoader from '@shared/FullPageLoader'
import Terms from '@components/account/Terms'
import Form from '@components/account/Form'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'))

const LAST_STEP = 2

function AccountNewPage({ initialStep }: { initialStep: number }) {
  const [step, setStep] = useState(initialStep)
  const navigate = useRouter()
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

      {step === 1 ? (
        <Form
          onNext={async (formValues) => {
            const newAccount = {
              ...formValues,
              accountNumber: Date.now(),
              balance: 0,
              status: 'READY',
              userId: user?.id as string,
            } as Account

            await createAccount(newAccount)

            setStep((prevStep) => prevStep + 1)
          }}
        />
      ) : null}

      {step === 2 ? (
        <>
          <FullPageLoader message="계좌 개설 신청이 완료되었습니다." />
          <FixedBottomButton
            label="확인"
            onClick={() => {
              navigate.push('/')
            }}
          />
        </>
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

  const account = await getAccount((session?.user as User).id)

  if (account == null) {
    return {
      props: {
        initialStep: 1,
      },
    }
  }

  return {
    props: {
      initialStep: 2,
    },
  }
}

export default withAuth(AccountNewPage)
