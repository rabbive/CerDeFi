import { useContractRead } from 'wagmi';
import { CREDIT_SCORE_ABI, CREDIT_SCORE_ADDRESS } from '../config/contracts';
import { defaultChain } from '../config/chains';

export function useCreditScore(address?: string) {
  const { data: score, isError, isLoading } = useContractRead({
    address: CREDIT_SCORE_ADDRESS[defaultChain.id],
    abi: CREDIT_SCORE_ABI,
    functionName: 'getCreditScore',
    args: address ? [address] : undefined,
    enabled: !!address,
  });

  return {
    score: score ? Number(score) : undefined,
    isError,
    isLoading,
  };
}