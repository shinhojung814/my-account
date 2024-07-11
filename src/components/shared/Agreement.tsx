import { MouseEvent } from 'react'
import { css } from '@emotion/react'

import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import Spacing from '@/components/shared/Spacing'
import { colors } from '@styles/colorPalette'

function Agreement({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column" as="ul" css={agreementContainerStyles}>
      {children}
    </Flex>
  )
}

function AgreementTitle({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    <Flex as="li" onClick={(e) => onChange(e, !checked)}>
      <IconCheck checked={checked} withCircle={true} />
      <Spacing direction="horizontal" size={8} />
      <Text bold={true}>{children}</Text>
    </Flex>
  )
}

function AgreementDescription({
  children,
  checked,
  onChange,
  link,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
  link?: string
}) {
  return (
    <Flex as="li" justify="space-between">
      <Flex
        onClick={(e) => {
          onChange(e, !checked)
        }}
      >
        <IconCheck checked={checked} withCircle={false} />
        <Spacing direction="horizontal" size={8} />
        <Text typography="t6">{children}</Text>
      </Flex>
      {link ? (
        <a href={link} target="_blank" rel="noreferrer">
          <Text typography="t6" color="black" bold={true}>
            링크
          </Text>
        </a>
      ) : null}
    </Flex>
  )
}

Agreement.Title = AgreementTitle
Agreement.Description = AgreementDescription

const agreementContainerStyles = css`
  padding: 24px;
  gap: 8px;

  & li {
    cursor: pointer;
  }
`

function IconCheck({
  checked,
  withCircle,
}: {
  checked: boolean
  withCircle: boolean
}) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={24}
      height={24}
      fill={checked ? colors.blue : colors.gray400}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M335 175L224 286.1L176.1 239c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l64 64C211.7 341.7 217.8 344 224 344s12.28-2.344 16.97-7.031l128-128c9.375-9.375 9.375-24.56 0-33.94S344.4 165.7 335 175z" />
      {withCircle && (
        <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z" />
      )}
    </svg>
  )
}

export default Agreement
