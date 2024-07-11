import { useQuery } from 'react-query'

import { CHECK_STATUS } from '@constants/credit'

interface useCreditCheckProps {
  onSuccess: (creditScore: number) => void
  onError: () => void
  enabled: boolean
}

function useCreditCheck({ onSuccess, onError, enabled }: useCreditCheckProps) {
  return useQuery(['useCreditCheck'], () => getCheckStatus(), {
    enabled,
    refetchInterval: 2_000,
    staleTime: 0,
    onSuccess: (status) => {
      if (status === CHECK_STATUS.COMPLETE) {
        onSuccess(getCreditScore(200, 1000))
      }
    },
    onError,
  })
}

function getCheckStatus() {
  const values = [
    CHECK_STATUS.READY,
    CHECK_STATUS.IN_PROGRESS,
    CHECK_STATUS.REJECTED,
    CHECK_STATUS.COMPLETE,
  ]

  const status = values[Math.floor(Math.floor(Math.random() * values.length))]

  if (status === CHECK_STATUS.REJECTED) {
    throw new Error('신용점수 조회에 실패했습니다.')
  }

  return status
}

function getCreditScore(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default useCreditCheck
