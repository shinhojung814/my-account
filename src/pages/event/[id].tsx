import { GetServerSidePropsContext } from 'next'

import { Event } from '@models/event'
import { getEvent } from '@remote/event'

interface EventPageProps {
  id: string
  initialEvent: Event
}

function EventPage({ id, initialEvent }: EventPageProps) {
  console.log(id, initialEvent)

  return <div>EventPage</div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query

  const event = await getEvent(id as string)

  return {
    props: { id, initialEvent: event },
  }
}

export default EventPage
