import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { User } from 'src/user/interface/user.interface';

function verifyJWT(jwt: string): JwtPayload {
  const decodedJwt = verify(jwt, process.env.JWT_SECRET) as JwtPayload;
  return decodedJwt;

}

function signJWT(user: User): string {
  const { id, username, gender } = user;
  const userData = { id, username, gender };
  const jwt = sign(userData, process.env.JWT_SECRET, {
    expiresIn: '2h',
  });
  return jwt;
}

export { verifyJWT, signJWT };
