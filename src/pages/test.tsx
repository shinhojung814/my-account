import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import EventBannerAddButton from '@components/test/EventBannerAddButton'
import CardListAddButton from '@components/test/CardListAddButton'
import EventForm from '@components/test/EventForm'

function TestPage() {
  return (
    <div style={{ padding: 24 }}>
      <Flex direction="column">
        <Text bold={true}>배너</Text>
        <EventBannerAddButton />

        <Spacing
          direction="vertical"
          size={8}
          backgroundColor="gray100"
          style={{ margin: '20px 0' }}
        />

        <Text bold={true}>카드</Text>
        <CardListAddButton />

        <Spacing
          direction="vertical"
          size={8}
          backgroundColor="gray100"
          style={{ margin: '20px 0' }}
        />

        <EventForm />
      </Flex>
    </div>
  )
}

export default TestPage
