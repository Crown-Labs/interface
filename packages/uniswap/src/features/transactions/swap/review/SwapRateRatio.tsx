import { useState } from 'react'
import { Flex, Text } from 'ui/src'
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext'
import { useSwapFormContext } from 'uniswap/src/features/transactions/swap/contexts/SwapFormContext'
import { getTradeAmounts } from 'uniswap/src/features/transactions/swap/hooks/getTradeAmounts'
import { useAcceptedTrade } from 'uniswap/src/features/transactions/swap/hooks/useAcceptedTrade'
import { useUSDCValue } from 'uniswap/src/features/transactions/swap/hooks/useUSDCPrice'
import { IndicativeTrade, Trade } from 'uniswap/src/features/transactions/swap/types/trade'
import { calculateRateLine, getRateToDisplay } from 'uniswap/src/features/transactions/swap/utils/trade'
import { isWrapAction } from 'uniswap/src/features/transactions/swap/utils/wrap'

type SwapRateRatioProps = {
  trade: Trade | IndicativeTrade | undefined | null
  styling?: 'primary' | 'secondary'
  initialInverse?: boolean
}
export function SwapRateRatio({
  trade,
  styling = 'primary',
  initialInverse = false,
}: SwapRateRatioProps): JSX.Element | null {
  const formatter = useLocalizationContext()
  const [showInverseRate, setShowInverseRate] = useState(initialInverse)
  const { derivedSwapInfo, isSubmitting } = useSwapFormContext()
  const { wrapType } = derivedSwapInfo

  const { acceptedDerivedSwapInfo: swapAcceptedDerivedSwapInfo } = useAcceptedTrade({
    derivedSwapInfo,
    isSubmitting,
  })

  const acceptedDerivedSwapInfo = isWrapAction(wrapType) ? derivedSwapInfo : swapAcceptedDerivedSwapInfo
  const { outputCurrencyAmount } = getTradeAmounts(acceptedDerivedSwapInfo)
  const usdAmountOut = useUSDCValue(outputCurrencyAmount)

  const latestFiatPriceFormatted = calculateRateLine(
    usdAmountOut,
    outputCurrencyAmount,
    trade,
    showInverseRate,
    formatter,
  )

  const latestRate = trade ? getRateToDisplay(formatter, trade, showInverseRate) : null
  const rateAmountUSD = latestFiatPriceFormatted
  const isPrimary = styling === 'primary'

  if (!trade) {
    return null
  }

  return (
    <Flex pressStyle={{ opacity: 0.2 }} onPress={(): void => setShowInverseRate(!showInverseRate)}>
      <Text
        adjustsFontSizeToFit
        color={isPrimary ? '$kty_accent3' : '$kty_accent3'}
        fontWeight={isPrimary ? 400 : 500}
        numberOfLines={1}
        fontSize={14}
        textAlign="left"
      >
        {latestRate}
        <Text color={isPrimary ? '$kty_neutral2' : '$kty_neutral2'} variant="body3" backgroundColor="transparent">
          {rateAmountUSD && ` (${rateAmountUSD})`}
        </Text>
      </Text>
    </Flex>
  )
}
