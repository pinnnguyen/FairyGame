import { defineEventHandler } from 'h3';
import { A as AuctionSchema } from './nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'defu';
import 'radix3';
import 'mongoose';
import 'node-cron';
import 'next-auth/core';
import 'requrl';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'socket.io';
import 'moment';
import 'ipx';

const index_get = defineEventHandler(async () => {
  const auction = await AuctionSchema.aggregate(
    [
      {
        $match: { open: true }
      },
      {
        $lookup: {
          from: "gl_auction_items",
          localField: "_id",
          foreignField: "auctionId",
          pipeline: [
            {
              $lookup: {
                from: "players",
                localField: "sid",
                foreignField: "sid",
                as: "player",
                pipeline: [
                  {
                    $project: {
                      name: true
                    }
                  }
                ]
              }
            },
            // {
            //
            // },
            {
              $lookup: {
                from: "gl_equipments",
                localField: "equipmentId",
                foreignField: "id",
                as: "equipment"
              }
            },
            {
              $lookup: {
                from: "gl_gems",
                localField: "gemId",
                foreignField: "id",
                as: "gem"
              }
            }
          ],
          as: "auctionItems"
        }
      },
      {
        $limit: 1
      }
    ]
  );
  if (auction.length <= 0)
    return false;
  return auction[0];
});

export { index_get as default };
//# sourceMappingURL=index.get7.mjs.map
