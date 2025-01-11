import { mainnet, polygon, polygonMumbai } from 'viem/chains';

export const supportedChains = [polygon, polygonMumbai];
export const defaultChain = polygonMumbai;

export const getChainName = (chainId: number): string => {
  switch (chainId) {
    case polygon.id:
      return 'Polygon';
    case polygonMumbai.id:
      return 'Polygon Mumbai';
    default:
      return 'Unsupported Network';
  }
};