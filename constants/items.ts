export const ITEMS_ICON = {
  exp: '/items/7.png',
  gold: '/items/3.png',
}

export const ItemToName: Record<string, string> = {
  exp: 'Tu Vi',
  gold: 'Tiền Tiên',
  knb: 'Tiên Duyên',
  bag: 'Quỹ Boss',
  kill: 'Tiêu Diệt',
  top: 'ST Cao Nhất',
}

export const ItemToQuality: Record<string, number> = {
  exp: 1,
  gold: 2,
  knb: 3,
  bag: 5,
  kill: 3,
  top: 5,
}

export enum CurrencyTitle {
  knb = 'Tiên Duyên',
  gold = 'Tiền Tiên',
  coin = 'Tiên Ngọc',
}
