import { player, PrismaClient } from '@prisma/client';
import { hash, verify } from 'argon2';

const prisma = new PrismaClient();

const login = async (username, password): Promise<player | null> => {
  const player = await prisma.player.findFirst({
    where: { username },
    include: {
      avatar: {
        include: {
          face: true,
          shirt: true,
          trousers: true,
          style: true,
        },
      },
    },
  });

  if (!player) return null;
  if (!(await verify(player.password, password))) return null;

  return player;
};

const register = async (username: string, password: string, faceId: number): Promise<player | null> => {
  if (!password || password.length < 8) return null;

  try {
    return await prisma.$transaction(async (tx) => {
      const player = await tx.player.create({
        // TODO: Co jeśli user już istnieje? Dokumentacja milczy xD powinniśmy w takim przypadku zwrócić błąd
        data: {
          username,
          password: await hash(password),
          money: 0,
          exp: 0,
        },
      });

      if (!player) throw new Error('Failed to create player');

      const playerId = player.id;

      // TODO: Czy da się wstawić wszystkie itemki na raz przy pomocy createMany() tak, żeby nam zwróciło te wstawione rekordy, a przynajmniej ich ID?
      const userTrousers = tx.inventory_item.create({
        data: {
          player_id: playerId,
          shop_item_id: 1,
        },
      });

      const userShirt = tx.inventory_item.create({
        data: {
          player_id: playerId,
          shop_item_id: 4,
        },
      });

      const userStyle = tx.inventory_item.create({
        data: {
          player_id: playerId,
          shop_item_id: 7,
        },
      });

      const userItems = await Promise.all([userTrousers, userShirt, userStyle]);

      const avatar = await tx.avatar.create({
        data: {
          face_id: Number(faceId),
          trousers_id: userItems[0].id,
          shirt_id: userItems[1].id,
          style_id: userItems[2].id,
        },
      });

      await tx.player.update({
        where: {
          id: playerId,
        },
        data: {
          avatar_id: avatar.id,
        },
      });

      return player;
    });
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { login, register };
