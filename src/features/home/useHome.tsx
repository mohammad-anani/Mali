import { getTotalLBPBalance, getTotalUSDBalance } from "@/backend/business-layer/transactions/balance";
import { useQuery } from "@tanstack/react-query";

export default function useHome() {


  const { data: u, isError, isLoading } = useQuery({ queryKey: ["usdBalance"], queryFn: getTotalUSDBalance })
  const { data: l } = useQuery({ queryKey: ["lbpBalance"], queryFn: getTotalLBPBalance })

  const usdBalance = u as number | null;
  const lbpBalance = l as number | null;


  return { usdBalance, lbpBalance, isError, isLoading }

}
