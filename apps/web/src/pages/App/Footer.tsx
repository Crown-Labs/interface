import { memo } from 'react'

import deprecatedStyled from 'lib/styled-components'
import { Discord, Github, Twitter } from 'pages/Landing/components/Icons'
import { Wiggle } from 'pages/Landing/components/animations'
import { Anchor, Flex, Text, styled } from 'ui/src'

const SocialIcon = deprecatedStyled(Wiggle)`
  flex: 0;
  fill: #B48DFF;
  cursor: pointer;
  transition: fill;
`

const AppFooter = styled(Flex, {
  mt: 'auto',
  px: '$spacing32',
  py: '$spacing16',
})

const Container = styled(Flex, {
  mt: '$spacing16',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const Footer = memo(function Footer() {
  const iconSize = '25'
  return (
    <AppFooter>
      <Container>
        <Text variant="body3" color="$kty_neutral2">
          2024 © Crown Labs
        </Text>
        <Flex row gap="$spacing12" maxHeight={iconSize} alignItems="flex-start">
          <SocialIcon $hoverColor="#00C32B">
            <Anchor href="https://github.com/Uniswap" target="_blank">
              <Github size={iconSize} fill="inherit" />
            </Anchor>
          </SocialIcon>
          <SocialIcon $hoverColor="#20BAFF">
            <Anchor href="https://x.com/Uniswap" target="_blank">
              <Twitter size={iconSize} fill="inherit" />
            </Anchor>
          </SocialIcon>
          <SocialIcon $hoverColor="#5F51FF">
            <Anchor href="https://discord.com/invite/uniswap" target="_blank">
              <Discord size={iconSize} fill="inherit" />
            </Anchor>
          </SocialIcon>
        </Flex>
      </Container>
    </AppFooter>
  )
})
