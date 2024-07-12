import { useState, ChangeEvent } from 'react'

import { Transaction } from '@models/transaction'
import { getAccount, updateAccountBalance } from '@remote/account'
import { createTransaction } from '@remote/transaction'
import Flex from '@shared/Flex'
import Button from '@shared/Button'
import Select from '@shared/Select'
import Spacing from '@shared/Spacing'
import TextField from '@shared/TextField'

function TransactionForm() {
  const [formValues, setFormValues] = useState({
    userId: '',
    type: 'deposit',
    amount: '',
    balance: '',
    displayText: '',
    date: '',
  })

  const handleFormValues = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async () => {
    const account = await getAccount(formValues.userId)

    if (account == null) {
      window.alert('해당 유저는 계좌를 보유하고 있지 않습니다.')
      return
    }

    if (
      formValues.type === 'withdraw' &&
      account.balance - Number(formValues.amount) < 0
    ) {
      window.alert(`현재 유저의 잔액은 ${account.balance}원입니다.`)

      return
    }

    const balance =
      formValues.type === 'withdraw'
        ? account.balance - Number(formValues.amount)
        : account.balance + Number(formValues.amount)

    const newTransaction = {
      ...formValues,
      amount: Number(formValues.amount),
      date: new Date().toISOString(),
      balance,
    } as Transaction

    await Promise.all([
      createTransaction(newTransaction),
      updateAccountBalance(formValues.userId, balance),
    ])

    window.alert('입출금 데이터 생성 완료')
  }

  return (
    <div>
      <Flex direction="column">
        <TextField
          name="userId"
          label="userId"
          value={formValues.userId}
          onChange={(e) => handleFormValues(e)}
        />
        <Spacing direction="vertical" size={8} />
        <Select
          name="type"
          label="type"
          value={formValues.type}
          options={[
            { label: '입금', value: 'deposit' },
            { label: '출금', value: 'withdraw' },
          ]}
          onChange={(e) => handleFormValues(e)}
        />
        <Spacing direction="vertical" size={8} />
        <TextField
          name="amount"
          label="amount"
          value={formValues.amount}
          onChange={(e) => handleFormValues(e)}
        />
        <Spacing direction="vertical" size={8} />
        <TextField
          name="displayText"
          label="displayText"
          value={formValues.displayText}
          onChange={(e) => handleFormValues(e)}
        />
        <Spacing direction="vertical" size={8} />
        <Button onClick={handleSubmit}>
          {formValues.type === 'deposit' ? '입금' : '출금'}
        </Button>
      </Flex>
    </div>
  )
}
export default TransactionForm
