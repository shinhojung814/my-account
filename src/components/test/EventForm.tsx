import { useState, useCallback, ChangeEvent } from 'react'
import { collection, doc, setDoc } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/collection'
import Flex from '@shared/Flex'
import Button from '@shared/Button'
import TextField from '@shared/TextField'

function EventForm() {
  const [formValues, setFormValues] = useState({
    title: '',
    subtitle: '',
    contents: '',
    buttonLabel: '',
    link: '',
    endDate: '',
  })

  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [e.target.name]: e.target.value,
      }))
    },
    [],
  )

  const handleSubmit = async () => {
    await setDoc(doc(collection(store, COLLECTIONS.EVENT)), formValues)

    alert('이벤트 정보가 추가되었습니다.')
  }

  const isFormValid = Object.values(formValues).every((value) => value !== '')

  console.log('date', new Date())

  return (
    <Flex direction="column" style={{ padding: 24 }}>
      <Flex>
        <Flex direction="column" style={{ flex: 1 }}>
          <TextField
            name="title"
            label="이벤트 제목"
            value={formValues.title}
            onChange={handleFormValues}
          />
          <TextField
            name="subtitle"
            label="이벤트 부제목"
            value={formValues.subtitle}
            onChange={handleFormValues}
          />
          <textarea
            name="contents"
            value={formValues.contents}
            onChange={handleFormValues}
            style={{ height: 400 }}
          />
          <TextField
            name="buttonLabel"
            label="버튼명"
            value={formValues.buttonLabel}
            onChange={handleFormValues}
          />
          <TextField
            name="link"
            label="링크"
            value={formValues.link}
            onChange={handleFormValues}
          />
          <TextField
            name="endDate"
            label="이벤트 종료일"
            value={formValues.endDate}
            onChange={handleFormValues}
          />
        </Flex>
        <Flex style={{ flex: 2 }}>Preview</Flex>
      </Flex>
      <Button disabled={isFormValid === false} onClick={handleSubmit}>
        저장하기
      </Button>
    </Flex>
  )
}

export default EventForm
