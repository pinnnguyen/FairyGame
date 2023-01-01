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

export const needResourceUpgrade = (type: string, level: number) => {
  const BASE_GOLD = 1500
  const BASE_CHT = 2 // CUONG HOA THACH
  const reLevel = level === 0 ? 1 : level
  console.log('BASE_GOLD * reLevel', BASE_GOLD * reLevel)
  if (type === 'upgrade') {
    return {
      gold: BASE_GOLD * reLevel,
      cuongHoaThach: BASE_CHT * reLevel,
    }
  }

  return {
    gold: BASE_GOLD,
    cuongHoaThach: BASE_CHT,
  }
}
