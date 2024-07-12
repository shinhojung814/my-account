import { useState, MouseEvent } from 'react'
import dynamic from 'next/dynamic'

import { TERMS_LIST } from '@constants/account'
import { Term } from '@models/account'
import Agreement from '@shared/Agreement'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

function Terms({ onNext }: { onNext: (termsIds: string[]) => void }) {
  const [termsAgreed, setTermsAgreed] = useState(() =>
    generateInitialValues(TERMS_LIST),
  )

  const handleTermsAgreed = (id: string, checked: boolean) => {
    setTermsAgreed((prevTermsAgreed) => {
      return prevTermsAgreed.map((terms) =>
        terms.id === id ? { ...terms, checked } : terms,
      )
    })
  }

  const handleAllTermsAgreed = (
    _: MouseEvent<HTMLElement>,
    checked: boolean,
  ) => {
    setTermsAgreed((prevTermsAgreed) => {
      return prevTermsAgreed.map((terms) => ({ ...terms, checked }))
    })
  }

  const allTermsAgreed = termsAgreed.every((terms) => terms.checked)
  const allMandatoryAgreed = termsAgreed
    .filter((terms) => terms.mandatory)
    .every((terms) => terms.checked)

  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={allTermsAgreed}
          onChange={(_, checked) => handleAllTermsAgreed(_, checked)}
        >
          약관 모두 동의
        </Agreement.Title>
        {termsAgreed.map((terms) => (
          <Agreement.Description
            key={terms.id}
            link={terms.link}
            checked={terms.checked}
            onChange={(_, checked) => handleTermsAgreed(terms.id, checked)}
          >
            {terms.mandatory ? '[필수]' : '[선택]'} {terms.title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관 동의"
        disabled={allMandatoryAgreed === false}
        onClick={() => {
          onNext(
            termsAgreed.filter((terms) => terms.checked).map(({ id }) => id),
          )
        }}
      />
    </div>
  )
}

function generateInitialValues(terms: Term[]) {
  return terms.map((term) => ({ ...term, checked: false }))
}

export default Terms
