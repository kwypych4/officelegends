import { Request, Response } from 'express';
import { hash, verify } from 'argon2';
import { playerUtils } from '../../utils/DbUtils';
import { badRequest, ok, serverError, unauthorized } from '../../utils/ResponseUtils';

const register = async (username: string, password: string, avatarId: number, req: Request, res: Response) => {
  if (!password || password.length < 8) return badRequest('Password too short', res);

  const passwordHash = await hash(password);

  let player;
  try {
    player = await playerUtils.createPlayer(username, passwordHash, avatarId);
  } catch (e) {
    return serverError(`Failed to register new player`, res);
  }

  if (!player) return badRequest('Username already taken', res);

  req.session.playerId = player.id;

  return ok('Account registered', res);
};

const login = async (username: string, password: string, req: Request, res: Response) => {
  const player = await playerUtils.findPlayerByUsername(username);

  if (!player || !password) return unauthorized('Login failed', res);
  if (!(await verify(player.password, password))) return unauthorized('Login failed', res);

  req.session.playerId = player.id;

  return ok('Login successful', res);
};

const logout = (req: Request, res: Response) => {
  req.session.destroy((e) => {
    if (e) {
      return serverError('Failed to destroy session', res);
    }

    return ok('Logout successful', res);
  });
};

export { register, login, logout };
