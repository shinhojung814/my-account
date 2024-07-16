import { useState, useMemo, useCallback, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'
import { format } from 'date-fns'

import { createPiggyBank } from '@remote/piggybank'
import { PiggyBank } from '@models/piggybank'
import { useAlertContext } from '@contexts/AlertContext'
import withAuth from '@hooks/withAuth'
import useUser from '@hooks/useUser'
import Flex from '@shared/Flex'
import TextField from '@shared/TextField'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

function NewPiggyBankPage() {
  const [formValues, setFormValues] = useState({
    name: '',
    endDate: '',
    goalAmount: '',
  })

  const user = useUser()
  const navigate = useRouter()
  const { open } = useAlertContext()

  const minDate = useMemo(() => format(new Date(), 'yyyy-MM-dd'), [])

  const { mutate, isLoading } = useMutation(
    (newPiggyBank: PiggyBank) => createPiggyBank(newPiggyBank),
    {
      onSuccess: () => {
        open({
          title: '새로운 저금통이 추가되었습니다.',
          onButtonClick: () => {
            navigate.push('/account')
          },
        })
      },
      onError: () => {
        open({
          title: '새로운 저금통을 생성하는 데에 실패했습니다.',
          description: '잠시 후 다시 시도해주세요.',
          onButtonClick: () => {
            throw new Error()

            window.history.back()
          },
        })
      },
    },
  )

  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [e.target.name]: e.target.value,
      }))
    },
    [formValues],
  )

  const handleSubmit = () => {
    const newPiggyBank = {
      ...formValues,
      userId: user?.id as string,
      startDate: new Date(),
      endDate: new Date(formValues.endDate),
      goalAmount: Number(formValues.goalAmount),
      balance: 0,
    } as PiggyBank

    mutate(newPiggyBank)
  }

  return (
    <div style={{ padding: 24 }}>
      <Flex direction="column">
        <TextField
          name="name"
          label="통장명"
          value={formValues.name}
          onChange={handleFormValues}
        />
        <TextField
          name="endDate"
          label="종료일"
          type="date"
          value={formValues.endDate}
          min={minDate}
          onChange={handleFormValues}
        />
        <TextField
          name="goalAmount"
          label="목표 금액"
          type="number"
          value={formValues.goalAmount}
          onChange={handleFormValues}
        />
      </Flex>
      <FixedBottomButton
        label="저금통 만들기"
        onClick={handleSubmit}
        disabled={isLoading === true}
      />
    </div>
  )
}

export default withAuth(NewPiggyBankPage)
