import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { User } from 'src/user/interface/user.interface';

function verifyJWT(jwt: string): any {
  if (jwt) {
    try {
      const decodedJwt = verify(jwt, process.env.JWT_SECRET) as JwtPayload;
      return decodedJwt;
    } catch (e) {
      return {
        type: 'Invalid Token',
        token: jwt,
      };
    }
  }
}

function signJWT(user: User): string {
  const { username, gender } = user;
  const userData = { username, gender };
  const jwt = sign(userData, process.env.JWT_SECRET, {
    expiresIn: '2h',
  });
  return jwt;
}

export { verifyJWT, signJWT };
