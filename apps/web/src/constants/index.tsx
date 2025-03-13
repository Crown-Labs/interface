/* eslint-disable */
import { permit2Address as permit2AddressSDK } from '@uniswap/permit2-sdk'
import { ChainId, SupportedChainsType } from '@uniswap/sdk-core'
import {
  UNIVERSAL_ROUTER_ADDRESS as UNIVERSAL_ROUTER_ADDRESS_SDK,
  UniversalRouterVersion,
} from '@uniswap/universal-router-sdk'

// Swap Router
export type RouterConfig = {
  address: string
  creationBlock: number
}

type ChainConfig = {
  weth: string
  routerConfigs: { [key in UniversalRouterVersion]: RouterConfig }
}

export const CHAIN_CONFIGS: { [key: number]: ChainConfig } = {
  // mainnet
  // [1]: {
  //   weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  //   routerConfigs: {
  //     [UniversalRouterVersion.V1_2]: {
  //       address: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
  //       creationBlock: 17143817,
  //     },
  //     [UniversalRouterVersion.V2_0]: {
  //       address: '0x66a9893cc07d91d95644aedd05d03f95e1dba8af',
  //       creationBlock: 1737658355,
  //     },
  //   },
  // },
  // sepolia
  [11155111]: {
    weth: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
    routerConfigs: {
      [UniversalRouterVersion.V1_2]: {
        address: '0x561A87303005D9C83FbD94dDEb80D63528fCD448',
        creationBlock: 3543575,
      },
      [UniversalRouterVersion.V2_0]: {
        address: '0x561A87303005D9C83FbD94dDEb80D63528fCD448', // only update here and creation block below
        creationBlock: 7760438,
      },
    },
  },
}

export const UNIVERSAL_ROUTER_ADDRESS = (version: UniversalRouterVersion, chainId: number): string => {
  if (chainId !== 11155111) {
    return UNIVERSAL_ROUTER_ADDRESS_SDK(version, chainId)
  }

  if (!(chainId in CHAIN_CONFIGS)) throw new Error(`Universal Router not deployed on chain ${chainId}`)
  return CHAIN_CONFIGS[chainId].routerConfigs[version].address
}

// Permit2 Address
export function permit2Address(chainId?: number): string {
  return permit2AddressSDK(chainId)
}

// Chain to Addresses Map
// sepolia v3 addresses
type ChainAddresses = {
  // v4
  PositionDescriptor: string
  KittycornBank: string
  KittycornPositionManager: string
  KittycornRouter: string
  KittycornTreasury: string
  KittycornV4Quoter: string
}

const MAIN_ADDRESSES: ChainAddresses = {
  // TODO: update all below once v4 on sepolia redeployed
  PositionDescriptor: '0x12570561f184C7Bf46C7EcA7D937db49861C7e61',
  KittycornBank: '0x7edE11c1BFBfEF87b32B224686DD7c6d75E21d31',
  KittycornPositionManager: '0x62E252DDC87948CF12748cec24C096AAFa7052FD',
  KittycornRouter: '0x561A87303005D9C83FbD94dDEb80D63528fCD448',
  KittycornTreasury: '0xF29a581A7E94FA8CAE04ee1fa3556990F23b2820',
  KittycornV4Quoter: '0x8a2D75bAadcd2C71b2aCF715fc3Da68964CEA48e',
}

const SEPOLIA_ADDRESSES: ChainAddresses = {
  // TODO: update all below once v4 on sepolia redeployed
  PositionDescriptor: '0x12570561f184C7Bf46C7EcA7D937db49861C7e61',
  KittycornBank: '0x7edE11c1BFBfEF87b32B224686DD7c6d75E21d31',
  KittycornPositionManager: '0x62E252DDC87948CF12748cec24C096AAFa7052FD',
  KittycornRouter: '0x561A87303005D9C83FbD94dDEb80D63528fCD448',
  KittycornTreasury: '0xF29a581A7E94FA8CAE04ee1fa3556990F23b2820',
  KittycornV4Quoter: '0x8a2D75bAadcd2C71b2aCF715fc3Da68964CEA48e',
}

export const CHAIN_TO_ADDRESSES_MAP: Partial<Record<SupportedChainsType, ChainAddresses>> = {
  [ChainId.MAINNET]: MAIN_ADDRESSES,
  [ChainId.SEPOLIA]: SEPOLIA_ADDRESSES,
}
