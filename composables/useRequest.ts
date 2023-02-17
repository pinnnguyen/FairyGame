export const useRequest = () => {
  const useBattleRequest = useState<{ id: number | string; target: string }>('battleRequest')

  return {
    useBattleRequest,
  }
}
