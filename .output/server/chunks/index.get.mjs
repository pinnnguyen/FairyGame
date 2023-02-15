import { defineEventHandler } from 'h3';
import { g as getStoreItems } from './store.mjs';
import 'mongoose';

const index_get = defineEventHandler(async () => {
  return getStoreItems();
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
