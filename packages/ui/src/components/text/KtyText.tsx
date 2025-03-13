import { PropsWithChildren } from 'react'
import { GetProps, Text as TamaguiText, isWeb, styled } from 'tamagui'
import { Flex } from 'ui/src/components/layout'
import { HiddenFromScreenReaders } from 'ui/src/components/text/HiddenFromScreenReaders'
import { useEnableFontScaling } from 'ui/src/components/text/useEnableFontScaling'
import { Skeleton } from 'ui/src/loading/Skeleton'
import { fonts } from 'ui/src/theme/fonts'

export const KtyTextFrame = styled(TamaguiText, {
  fontFamily: '$ktyFont',
  wordWrap: 'break-word',

  variants: {
    variant: {
      heading1: {
        fontFamily: '$ktyFont',
        fontSize: '$large',
        lineHeight: '$large',
        fontWeight: 600,
        maxFontSizeMultiplier: fonts.heading1.maxFontSizeMultiplier,
      },
      body1: {
        fontFamily: '$ktyFont',
        fontSize: '$large',
        lineHeight: '$large',
        fontWeight: 500,
        maxFontSizeMultiplier: fonts.body1.maxFontSizeMultiplier,
      },
      body2: {
        fontFamily: '$ktyFont',
        fontSize: '$medium',
        lineHeight: '$medium',
        fontWeight: 500,
        maxFontSizeMultiplier: fonts.body2.maxFontSizeMultiplier,
      },
    },
  } as const,

  defaultVariants: {
    variant: 'body2',
  },
})

type KtyTextFrameProps = GetProps<typeof KtyTextFrame>

export type KtyTextProps = KtyTextFrameProps & {
  maxFontSizeMultiplier?: number
  allowFontScaling?: boolean
  loading?: boolean | 'no-shimmer'
  loadingPlaceholderKtyText?: string
  title?: string
}

// Use this text component throughout the app instead of
// Default RN KtyText for theme support

export const KtyTextPlaceholder = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
  return (
    <Flex row alignItems="center" testID="text-placeholder">
      <Flex row alignItems="center" position="relative">
        <HiddenFromScreenReaders>{children}</HiddenFromScreenReaders>
        <Flex
          backgroundColor={isWeb ? '$surface3' : '$surface2'}
          borderRadius="$roundedFull"
          bottom="5%"
          left={0}
          position="absolute"
          right={0}
          top="5%"
        />
      </Flex>
    </Flex>
  )
}

export const KtyTextLoaderWrapper = ({
  children,
  loadingShimmer,
}: { loadingShimmer?: boolean } & PropsWithChildren<unknown>): JSX.Element => {
  const inner = <KtyTextPlaceholder>{children}</KtyTextPlaceholder>
  if (loadingShimmer) {
    return <Skeleton>{inner}</Skeleton>
  }

  return inner
}

/**
 * Use this component instead of the default React Native <KtyText> component anywhere text shows up throughout the app, so we can use the design system values for colors and sizes, and make sure all text looks and behaves the same way
 * @param loading Whether the text inside the component is still loading or not. Set this to true if whatever content goes inside the <KtyText> component is coming from a variable that might still be loading. This prop is optional and defaults to false. This prop can also be set to "no-shimmer" to enable a loading state without the shimmer effect.
 * @param loadingPlaceholderKtyText - The text that the loader's size will be derived from. Pick something that's close to the same length as the final text is expected to be, e.g. if it's a ticker symbol, "XXX" might be a good placeholder text. This prop is optional and defaults to "000.00".
 */
export const KtyText = KtyTextFrame.styleable<KtyTextProps>(
  (
    { loading = false, allowFontScaling, loadingPlaceholderKtyText = '000.00', ...rest }: KtyTextProps,
    ref,
  ): JSX.Element => {
    const enableFontScaling = useEnableFontScaling(allowFontScaling)

    if (loading) {
      return (
        <KtyTextLoaderWrapper loadingShimmer={loading !== 'no-shimmer'}>
          <KtyTextFrame ref={ref} allowFontScaling={enableFontScaling} color="$transparent" opacity={0} {...rest}>
            {/* Important that `children` isn't used or rendered by <KtyText> when `loading` is true, because if the child of a <KtyText> component is a dynamic variable that might not be finished fetching yet, it'll result in an error until it's finished loading. We use `loadingPlaceholderKtyText` to set the size of the loading element instead. */}
            {loadingPlaceholderKtyText}
          </KtyTextFrame>
        </KtyTextLoaderWrapper>
      )
    }

    return <KtyTextFrame allowFontScaling={enableFontScaling} color="$neutral1" {...rest} />
  },
)
