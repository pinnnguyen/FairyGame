export const prepareSlots = (pos: number | undefined, _equipId: string) => {
  const slots: Record<number, any> = {
    1: {
      slot_1: _equipId,
    },
    2: {
      slot_2: _equipId,
    },
    3: {
      slot_3: _equipId,
    },
    4: {
      slot_4: _equipId,
    },
    5: {
      slot_5: _equipId,
    },
    6: {
      slot_6: _equipId,
    },
    7: {
      slot_7: _equipId,
    },
    8: {
      slot_8: _equipId,
    },
  }

  return slots[pos || 1]
}
