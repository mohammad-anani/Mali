import BUSINESS_FN from '@/src/dicts/businessFn';
import QUERY_KEYS from '@/src/dicts/queryKeys';
import useKeyboard from '@/src/hooks/useKeyboard';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';

export default function usePresetIdLayout(isDeposit: boolean) {

  const isKeyboardUp = useKeyboard();
  const param = useLocalSearchParams<{ id: string }>();
  const id = +param.id;
  const itemFn = BUSINESS_FN.presets.item.byId(isDeposit);
  const { data: preset, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.presets.item.byId(isDeposit, id), queryFn: async () => {
      return await itemFn(id as number);
    }
  });

  return { isKeyboardUp, preset, isError, isLoading };
}