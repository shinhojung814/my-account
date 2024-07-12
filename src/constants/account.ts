import { Term, AccountForm } from '@models/account'

export const TERMS_LIST = [
  {
    id: '01',
    title: '계좌 개설 관련 안내 및 필수 동의',
    link: 'https://www.google.com',
    mandatory: true,
  },
  {
    id: '02',
    title: '개인 정보 요약 동의서',
    link: 'https://www.google.com',
    mandatory: true,
  },
  {
    id: '03',
    title: '마케팅 수신 동의',
    link: 'https://www.google.com',
    mandatory: false,
  },
] as Term[]

export const FORMS = [
  {
    id: 'name',
    label: '한글명',
    required: true,
    type: 'TEXT_FIELD',
  },
  {
    id: 'phone',
    label: '전화번호',
    required: true,
    type: 'TEXT_FIELD',
  },
  {
    id: 'email',
    label: '이메일',
    required: true,
    type: 'TEXT_FIELD',
  },
  {
    id: 'accountName',
    label: '계좌명',
    required: true,
    type: 'TEXT_FIELD',
  },
] as AccountForm[]
