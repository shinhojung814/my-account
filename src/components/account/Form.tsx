import { useCallback, Fragment } from 'react'
import { useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'

import { FORMS } from '@constants/account'
import { AccountForm } from '@models/account'
import Select from '@shared/Select'
import Spacing from '@shared/Spacing'
import TextField from '@shared/TextField'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'))

type FormData = {
  [key: string]: string
}

function Form({ onNext }: { onNext: (formValues: FormData) => void }) {
  const { register, formState, handleSubmit } = useForm<FormData>({
    mode: 'onBlur',
  })

  const component = useCallback(
    (form: AccountForm) => {
      if (form.type === 'TEXT_FIELD') {
        return (
          <TextField
            label={form.label}
            helpMessage={
              (formState.errors[form.id]?.message as string) || form.helpMessage
            }
            hasError={formState.errors[form.id] != null}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      } else if (form.type === 'SELECT') {
        return (
          <Select
            label={form.label}
            options={form.options}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      } else {
        return null
      }
    },
    [formState.errors, register],
  )

  return (
    <div style={{ padding: 24 }}>
      <form>
        {FORMS.map((form) => {
          return (
            <Fragment key={form.id}>
              {component(form)}
              <Spacing size={12} />
            </Fragment>
          )
        })}
      </form>
      <FixedBottomButton label="계좌 개설하기" onClick={handleSubmit(onNext)} />
    </div>
  )
}

const VALIDATION_MESSAGE_MAP: {
  [key: string]: { value: RegExp; message: string }
} = {
  name: {
    value: /^[가-힣]+$/,
    message: '입력한 이름을 확인해주세요.',
  },
  email: {
    value: /^[a-zA-Z0-9+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: '입력한 이메일을 확인해주세요',
  },
  phone: {
    value: /^\d+$/,
    message: '입력한 전화번호를 확인해주세요.',
  },
}

export default Form
