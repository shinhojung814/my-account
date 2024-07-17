import { useMemo } from 'react'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { QueryClient, dehydrate, useQuery, useMutation } from 'react-query'

import { User } from '@models/user'
import { getTerms, updateTerms } from '@remote/account'
import { TERMS_LIST } from '@constants/account'
import useUser from '@hooks/useUser'
import Top from '@shared/Top'
import Text from '@shared/Text'
import Button from '@shared/Button'
import ListRow from '@shared/ListRow'

function TermsPage() {
  const user = useUser()
  const client = new QueryClient()
  const { data } = useQuery(
    ['terms', user?.id],
    () => getTerms(user?.id as string),
    {
      enabled: user != null,
    },
  )

  const { mutate, isLoading } = useMutation(
    (termsIds: string[]) => updateTerms(user?.id as string, termsIds),
    {
      onSuccess: () => {
        client.invalidateQueries(['terms', user?.id])
      },
      onError: () => {},
    },
  )

  const agreedTerms = useMemo(() => {
    if (data == null) {
      return null
    }

    const termsList = TERMS_LIST.filter(({ id }) => data.termsIds.includes(id))

    const mandatoryTerms = termsList.filter(
      ({ mandatory }) => mandatory === true,
    )
    const optionalTerms = termsList.filter(
      ({ mandatory }) => mandatory === false,
    )

    return { mandatoryTerms, optionalTerms }
  }, [data])

  const handleDisagree = (selectedTermsId: string) => {
    const updatedTermsIds = data?.termsIds.filter(
      (termsId) => selectedTermsId !== termsId,
    )

    if (updatedTermsIds != null) {
      mutate(updatedTermsIds)
    }
  }

  return (
    <div>
      <Top title="약관" subtitle="약관 목록 및 철회" />
      {agreedTerms == null ? (
        <Text>동의한 약관 목록이 없습니다.</Text>
      ) : (
        <ul>
          {agreedTerms.mandatoryTerms.map((terms) => (
            <ListRow
              key={terms.id}
              contents={
                <ListRow.Texts title={`[필수] ${terms.title}`} subtitle="" />
              }
            />
          ))}
          {agreedTerms.optionalTerms.map((terms) => (
            <ListRow
              key={terms.id}
              contents={
                <ListRow.Texts title={`[선택] ${terms.title}`} subtitle="" />
              }
              right={
                <Button
                  onClick={() => handleDisagree(terms.id)}
                  disabled={isLoading === true}
                >
                  철회
                </Button>
              }
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery(['terms', (session.user as User).id], () =>
      getTerms((session.user as User).id),
    )

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}

export default TermsPage
