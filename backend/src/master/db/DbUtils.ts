import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const basicSkinId = 1;

const playerFullInclude = {
  avatar: true,
  skin: true,
  inventory_skins: {
    include: {
      skin: true,
    },
  },
};

const inventoryUtils = {
  giveSkin: async (playerId: number, skinId: number) =>
    prisma.inventory_skin.create({
      data: {
        owner_id: playerId,
        skin_id: skinId,
      },
    }),
};

const playerUtils = {
  findPlayerById: (id: number) =>
    prisma.player.findFirst({
      where: {
        id,
      },
      include: playerFullInclude,
    }),
  findPlayerByUsername: (username: string) =>
    prisma.player.findFirst({
      where: {
        username,
      },
      include: playerFullInclude,
    }),
  setPlayerSkin: (playerId: number, inventorySkinId: number) =>
    prisma.player.update({
      where: {
        id: playerId,
      },
      data: {
        skin_id: inventorySkinId,
      },
    }),
  createPlayer: (username: string, passwordHash: string, avatarId: number) =>
    prisma.$transaction(async (tx) => {
      const p = await tx.player.create({
        data: {
          username,
          password: passwordHash,
          money: 0,
          exp: 0,
          avatar_id: avatarId,
        },
      });

      if (!p) throw new Error('Failed to insert player');

      const givenSkin = await tx.inventory_skin.create({
        data: {
          owner_id: p.id,
          skin_id: basicSkinId,
        },
      });

      await tx.player.update({
        where: {
          id: p.id,
        },
        data: {
          skin_id: givenSkin.id,
        },
      });

      return p;
    }),
};

export { inventoryUtils, playerUtils };