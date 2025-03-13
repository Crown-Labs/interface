import { CSSProperties } from 'react'

export function useScrollbarStyles(): CSSProperties {
  return {
    '&::WebkitScrollbar': {
      backgroundColor: 'transparent',
    },
    '&::WebkitScrollbarThumb': {
      backgroundColor: '#CDAAFE',
      borderRadius: '8px',
    },
    scrollbarWidth: 'thin',
    scrollbarColor: `#CDAAFE transparent`,
  } as CSSProperties
}
