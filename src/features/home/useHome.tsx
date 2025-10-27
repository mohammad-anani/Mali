import useBalance from "@/src/hooks/useBalance";

export default function useHome() {


  const { lbpBalance, usdBalance, isError, isLoading } = useBalance();

  return { usdBalance, lbpBalance, isError, isLoading }

}
