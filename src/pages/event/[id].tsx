import { GetServerSidePropsContext } from 'next'
import { useQuery } from 'react-query'
import { isAfter, parseISO } from 'date-fns'

import { Event } from '@models/event'
import { getEvent } from '@remote/event'
import Preview from '@components/event/Preview'
import { useAlertContext } from '@contexts/AlertContext'

interface EventPageProps {
  id: string
  initialEvent: Event
}

function EventPage({ id, initialEvent }: EventPageProps) {
  const { open } = useAlertContext()

  const { data } = useQuery(['event', id], () => getEvent(id), {
    initialData: initialEvent,
    onSuccess: (event) => {
      const isEventEnded = isAfter(new Date(), parseISO(event.endDate))

      if (isEventEnded) {
        open({
          title: `${event.title} 이벤트가 종료되었습니다.`,
          description: '다음 이벤트에 참여해보세요.',
          onButtonClick: () => {
            window.history.back()
          },
        })
      }
    },
  })

  if (data == null) {
    return null
  }

  return <Preview data={initialEvent} mode="preview" />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query

  const event = await getEvent(id as string)

  return {
    props: { id, initialEvent: event },
  }
}

export default EventPage
