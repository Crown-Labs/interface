import { NavIcon } from 'components/Logo/NavIcon'
import styled from 'lib/styled-components'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Text, useMedia } from 'ui/src'

const UniIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export function CompanyMenu() {
  const media = useMedia()
  const isLargeScreen = !media.xxl
  const navigate = useNavigate()

  const handleLogoClick = useCallback(() => {
    navigate({
      pathname: '/',
      search: '?intro=true',
    })
  }, [navigate])

  return (
    <UniIcon onClick={handleLogoClick} data-testid="nav-uniswap-logo">
      <NavIcon width="48" height="48" />
      {isLargeScreen && (
        <Text fontSize={24} color="$accent1" userSelect="none">
          Kitty
          <Text fontSize={24} color="$kty_accent2">
            corn
          </Text>
        </Text>
      )}
    </UniIcon>
  )
}
