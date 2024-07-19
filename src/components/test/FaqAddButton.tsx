import { collection, doc, writeBatch } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/collection'
import Button from '@shared/Button'

const FAQS = [
  {
    question: 'MyAccount는 어떤 서비스인가요?',
    answer: '유저에게 편리한 자산 관리 경험을 제공해주는 서비스입니다.',
  },
  {
    question: 'MyAccount는 어떤 서비스인가요?',
    answer: '유저에게 편리한 자산 관리 경험을 제공해주는 서비스입니다.',
  },
  {
    question: 'MyAccount는 어떤 서비스인가요?',
    answer: '유저에게 편리한 자산 관리 경험을 제공해주는 서비스입니다.',
  },
]

function FaqAddButton() {
  const handleButtonClick = () => {
    const batch = writeBatch(store)

    FAQS.forEach((faq) => {
      const docRef = doc(collection(store, COLLECTIONS.FAQ))

      batch.set(docRef, faq)
    })

    batch.commit().then(() => {
      window.alert('FAQ 데이터 추가')
    })
  }
  return <Button onClick={handleButtonClick}>FAQ 데이터 추가</Button>
}

export default FaqAddButton
