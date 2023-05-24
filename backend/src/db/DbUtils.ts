import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const playerFullInclude = {
  avatar: {
    include: {
      face: true,
      shirt: true,
      trousers: true,
      style: true,
    },
  },
};

export const findPlayerById = async (id: number) =>
  prisma.player.findFirst({
    where: {
      id,
    },
    include: playerFullInclude,
  });

export const findPlayerByUsername = async (username: string) =>
  prisma.player.findFirst({
    where: {
      username,
    },
    include: playerFullInclude,
  });
