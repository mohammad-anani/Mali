import { getTotalLBPBalance, getTotalUSDBalance } from "@/backend/business-layer/transactions/balance"
import { useQuery } from "@tanstack/react-query"

export default function useHome() {


  const { data: usdBalance, isError, isLoading } = useQuery({ queryKey: ["usdBalance"], queryFn: getTotalUSDBalance })
  const { data: lbpBalance } = useQuery({ queryKey: ["lbpBalance"], queryFn: getTotalLBPBalance })

  return { usdBalance, lbpBalance, isError, isLoading }

}
