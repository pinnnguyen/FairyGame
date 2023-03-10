export const ItemToName: Record<string, string> = {
  exp: 'Tu Vi',
  gold: 'Tiền Tiên',
  knb: 'Tiên Duyên',
  bag: 'Quỹ Boss',
  kill: 'Tiêu Diệt',
  top: 'ST Cao Nhất',
  scoreTienDau: 'Xu Tiên Đấu',
}

export const ItemToQuality: Record<string, number> = {
  exp: 1,
  gold: 2,
  knb: 3,
  bag: 5,
  kill: 3,
  top: 5,
  scoreTienDau: 3,
}

export enum CurrencyTitle {
  knb = 'Tiên Duyên',
  gold = 'Tiền Tiên',
  coin = 'Tiên Ngọc',
  scoreTienDau = 'Điểm Tiên Đấu',
}
