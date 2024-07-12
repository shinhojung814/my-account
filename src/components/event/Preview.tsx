import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { css } from '@emotion/react'
import ReactMarkdown from 'react-markdown'

import { Event } from '@models/event'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import { typographyMap } from '@styles/typography'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

function Preview({ data, mode }: { data: Event; mode: 'preview' | 'edit' }) {
  const navigate = useRouter()

  const { title, subtitle, contents, buttonLabel, link } = data

  return (
    <Flex direction="column">
      <Flex direction="column" style={{ padding: '12px 24px' }}>
        <Text bold={true}>{title}</Text>
        <Text typography="t6">{subtitle}</Text>
      </Flex>

      <div css={markdownStyles}>
        <ReactMarkdown>{contents}</ReactMarkdown>
      </div>

      {mode === 'preview' ? (
        <FixedBottomButton
          label={buttonLabel}
          onClick={() => {
            navigate.push(link)
          }}
        />
      ) : (
        <Button>{buttonLabel}</Button>
      )}
    </Flex>
  )
}

const markdownStyles = css`
  padding: 24px;
  ${typographyMap.t6};

  h1 {
    margin: 24px;
    ${typographyMap.t3};
    font-weight: bold;
  }

  h2 {
    margin: 18px;
    ${typographyMap.t4};
    font-weight: bold;
  }

  ul {
    padding-inline-start: 20px;
    margin: 18px 0;
  }

  li {
    list-style-type: disc;
  }

  p {
    margin: 18px 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`

export default Preview
