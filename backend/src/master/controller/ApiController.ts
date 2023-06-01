import { Request, Response } from 'express';
import { hash, verify } from 'argon2';
import { playerUtils } from '../db/DbUtils';
import { badRequest, ok, serverError, unauthorized } from '../../util/JsonResponses';

type UserStatus = {
  id: number;
  username: string;
  avatar: string;
  money: number;
  exp: number;
  skin: string;
  gameServer: number | null;
};

const createStatus = (player, gameServer): UserStatus => ({
  id: player.id,
  username: player.username,
  avatar: player.avatar.bitmap,
  money: player.money,
  exp: player.exp,
  skin: player.skin.skin.bitmap,
  gameServer,
});

const register = async (username: string, password: string, avatarId: number, req: Request, res: Response) => {
  if (!password || password.length < 8) return badRequest('Password must be at least 8 chars long', res);

  const passwordHash = await hash(password);

  let player;
  try {
    player = await playerUtils.createPlayer(username, passwordHash, avatarId);
  } catch (e) {
    return serverError(`Server error`, res);
  }

  if (!player) return badRequest('Username already taken', res);

  req.session.playerId = player.id;

  return ok(createStatus(player, req.session.gameServer), res);
};

const login = async (username: string, password: string, req: Request, res: Response) => {
  const errorMessage = 'Wrong username/password';
  if (!password) return unauthorized(errorMessage, res);

  const player = await playerUtils.findPlayerByUsername(username);
  if (!player) return unauthorized(errorMessage, res);
  if (!(await verify(player.password, password))) return unauthorized(errorMessage, res);

  req.session.playerId = player.id;

  return ok(createStatus(player, req.session.gameServer), res);
};

const logout = (req: Request, res: Response) => {
  req.session.destroy((e) => {
    if (e) {
      return serverError('Server error', res);
    }

    res.clearCookie('connect.sid');
    return ok({ message: 'Logout successful' }, res);
  });
};

const verifySession = async (req: Request, res: Response) => {
  const { playerId } = req.session;
  if (!playerId) return unauthorized('Session invalid', res);

  const player = await playerUtils.findPlayerById(playerId);
  if (!player) return unauthorized('Session invalid', res);

  return ok(createStatus(player, req.session.gameServer), res);
};

const apiController = { register, login, logout, verifySession };

export { apiController };
