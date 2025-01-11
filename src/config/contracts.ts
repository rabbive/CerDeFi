export const CREDIT_SCORE_ADDRESS = {
  [80001]: '0x0000000000000000000000000000000000000000', // Mumbai testnet (replace with actual address)
  [137]: '0x0000000000000000000000000000000000000000',  // Polygon mainnet (replace with actual address)
};

export const CREDIT_SCORE_ABI = [
  // Replace with actual ABI when smart contract is deployed
  {
    inputs: [{ name: 'address', type: 'address' }],
    name: 'getCreditScore',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;